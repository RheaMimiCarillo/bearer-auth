'use strict';

// we're never saving plain text!

const { Sequelize, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.beforeCreate(async (user, options) =>
{
  // hash our password here with difficulty 10
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// ask our model to validate a password
// Model, you should be able to tell us if this username and password is valid
Users.authenticateBasic = async (username, password) =>
{
  try
  {
    const user = await Users.findOne({ where: { username: username } });

    // I assume valid will return true? or something
    const valid = await bcrypt.compare(password, user.password);
    if (valid)
    {
      return user;
    }
  }
  catch (error)
  {
    throw new Error(error);
  }

}

Users.authenticateToken = async function (token)
{
  // verify the integrity of our token using the SECRET in the .env

  try
  {
    const parsedToken = jwt.verify(token, API_SECRET);

    // grab the user bits from the parsed token
    const user = await this.findOne({ where: { username: parsedToken.username } });
  }
  catch(error)
  {
    throw new Error(error);
  }
}

// before-create hook
// google: sequelize before-create hook
// https://sequelize.org/docs/v6/other-topics/hooks/
// functions that are called before 

module.exports = {
  Users,
  // export sequelize and call it `db`
  db: sequelize
}
