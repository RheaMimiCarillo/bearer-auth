# lab 7

``` JavaScript
// Users.js
'use strict'

// inside Users model:
token: {
  // getter method
  // it's super handy for working with data that's associated with our table, but we don't want to store it in the table
  get() {
  // create our JWT, using the username and the secret from the .env file and return it
  return jwt.sign({username: this.username}, API_SECRET);
 },
 // setter method
 set(payload) {
  return jwt.sign(payload, API_SECRET);
 }
}



Users.authenticateToken()
```

getter: a function that runs every time we try to read a value

JWT: serverside, sign our signature. when we get it back, verify the integrity of our signature, using our `secret`

`secret`: stored in our .env file

setter:

`npm i jsonwebtoken`: command to import JWT functionality for reading and stuff

- we gotta `require` it
- be sure we're importing this exact npm package
