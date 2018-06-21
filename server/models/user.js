const mongoose = require('mongoose');
const validator = require('validator');

/*Users model*/
var User = mongoose.model('User', {
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
