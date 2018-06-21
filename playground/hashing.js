const {SHA256} = require('crypto-js');

var message='Hello World';
var hashMsg = SHA256(message).toString();

console.log('Message:',message);
console.log('Hash:',hashMsg);

var data = {
  id:4
};

var token = {
  data,
  hash: (JSON.stringify(SHA256(data.id))+'somesecret').toString()
};

//Say the user wants to breach security

token.data.id = 5;
token.hash =(JSON.stringify(SHA256(data))).toString();

var actualHash = (JSON.stringify(SHA256(token.data))+'somesecret').toString();

if(token.hash === actualHash){
  console.log('We are fine');
}else{
  console.log('Security Breach');
}
