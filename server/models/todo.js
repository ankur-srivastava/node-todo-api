var mongoose = require('mongoose');
/*Create a Model with Validations like required, minlength, trim*/
var Todo = mongoose.model('Todo', {
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  },
  _creator:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
});

/*Add data and Save*/
// var newTodo = new Todo({
//   text:'Study CO for 1 hour   '
// });
//
// newTodo.save().then((res)=>{
//   console.log('Todo Saved',res);
// },(err)=>{
//   console.log(err);
// });

module.exports = {
  Todo
};
