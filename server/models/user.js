var mongoose = require('mongoose');

/*Users model*/
var User = mongoose.model('User', {
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  }
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
