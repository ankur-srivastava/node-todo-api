const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const bcryptjs = require('bcryptjs');

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

/*
  Mongoose Middleware is used to hash password using bcryptjs
  http://mongoosejs.com/docs/middleware.html
  Ex: var schema = new Schema(..);
        schema.pre('save', function(next) {
        next();
      });
*/
UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    bcryptjs.genSalt(10, (err, salt)=>{
      bcryptjs.hash(user.password,salt,(err, hash)=>{
        if(!err){
          console.log('Store this hash as password', hash);
          user.password = hash;
        }
        next();
      });
    });
  }else{
    next();
  }
});

/*We don't want to let others see our password & token in the response*/
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return lodash.pick(userObject, ['_id','email']);
};

/*Using statics to define method at model level or in terms of java at class level*/
UserSchema.statics.findByToken = function(token){
  //Use the Model here i.e. User
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, 'somesecret');
  }catch(e){
    // return new Promise((resolve, reject)=>{
    //   reject();
    // });
    return Promise.reject();
  }
  return User.findOne({
    _id:decoded._id,
    'tokens.access':'auth',
    'tokens.token':token
  });
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
