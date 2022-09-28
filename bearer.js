// look at req.header bearer bits and look at the JWT

// return something that says if the JWT is a valid token or not

'use strict'

const Users = require('./models/Users');

// is this redundant?
const { Users } = require('./models/Users.js');

async function Bearer(req, res, next)
{

  // ['Bearer', JWT-string-thing]
  // remove the first thing in the header (the bearer)
  // and then just save the `JWT` as the `token` variable
  let authHeader = req.headers.authorization.split(' ')
  let token = authHeader[1];

  try
  {
    const user = await Users.authenticateBearer(token);
    if (user)
    {
      req.user = user;
      next();
    }
    else
    {
      next('invalid token');
    }
  }
  catch (error)
  {
    next(error);
  }
}
