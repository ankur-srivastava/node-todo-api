const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id:4
};

/*
  jwt.sign method takes the data and generates a token. Use www.jwt.io to see data from token
  jwt.verify is used to verify that the data was not manipulated
*/
var token = jwt.sign(data, 'somesecret');
console.log(token);

var decoded = jwt.verify(token, 'somesecret');
console.log('Decoded',decoded);
