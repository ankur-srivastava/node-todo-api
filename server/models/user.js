const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');

/*Using Mongoose Schema let's us use custom methods*/
var UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
        validator: validator.isEmail,
        message: 'Not a valid email'
    }
  },
  password:{
    type:String,
    required:true
  },
  tokens: [
    {
      access:{
        type: String,
        required: true
      },
      token:{
        type: String,
        required: true
      }
    }
  ]
});

/*We don't want to let others see our password & token in the response*/
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return lodash.pick(userObject, ['_id','email']);
};

/*
  Create a new instance method for individual user object
  We use function() syntax because we need this keyword
*/
UserSchema.methods.generateAuthToken = function(){
  var current_user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id:current_user._id.toHexString(),
    access
  }, 'somesecret').toString();
  current_user.tokens = current_user.tokens.concat([
    {
      access,
      token
    }
  ]);

  return current_user.save().then(()=>{
    return token;
  });
};

/*Users model*/
var User = mongoose.model('User', UserSchema);

// var newUser = new User({
//   email:'ankur'
// });
//
// newUser.save().then((res)=>{
//   console.log('User Saved',res);
// }, (err)=>{
//   console.log('Error',err);
// });

module.exports = {
  User
};
