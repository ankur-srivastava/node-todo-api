const {SHA256} = require('crypto-js');
const bcryptjs = require('bcryptjs');

var pwd = 'abc123';
bcryptjs.genSalt(10, (err, salt)=>{
  bcryptjs.hash(pwd,salt,(err, hash)=>{
    if(!err){
      console.log('Store this hash as password', hash);
      return;
    }
  });
});

var hashedPwd = '$2a$10$FfQJOwSDAKdw/as8yOS6OezJ6QeTqtW.4PsoqDOOA0fjah8BmSVKO';

bcryptjs.compare(pwd, hashedPwd, (err, res)=>{
  console.log('Result', res);
});

// var message='Hello World';
// var hashMsg = SHA256(message).toString();
//
// console.log('Message:',message);
// console.log('Hash:',hashMsg);
//
// var data = {
//   id:4
// };
//
// var token = {
//   data,
//   hash: (JSON.stringify(SHA256(data.id))+'somesecret').toString()
// };
//
// //Say the user wants to breach security
//
// token.data.id = 5;
// token.hash =(JSON.stringify(SHA256(data))).toString();
//
// var actualHash = (JSON.stringify(SHA256(token.data))+'somesecret').toString();
//
// if(token.hash === actualHash){
//   console.log('We are fine');
// }else{
//   console.log('Security Breach');
// }
