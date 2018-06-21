const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id:4
};
//This token will be sent back to client & also stored in user model
var token = jwt.sign(data, 'somesecret');
jwt.verify
