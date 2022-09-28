'use strict';

const { describe, default: test } = require('node:test');
const { db, Users } = require('../User.js')


// before all, make table 
beforeAll(async () =>
{
  await db.sync();
})

// after everything else runs, drop the tables
afterAll(async() =>
{
  await db.drop();
})

describe('Testing user model', () =>
{
  test('Usermodel can create a token', async () =>
  {
    const user = await Users.create({
      username: 'test user',
      password: 'test pass'
    });

    // we're just expecting our server to respond with the plain text strings for username and password
    expect(user.username).toEqual('test user');
    expect(user.password).toEqual('test pass');

    expect(user.username).e
    expect(user.)
  });
});
