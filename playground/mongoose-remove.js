const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Removes everything
// Todo.remove({}).then((res)=>{
//   console.log(res);
// });

Todo.findByIdAndRemove('5b287a75c6ad8402b9494c95').then((res)=>{
  console.log('Response from Server',res);
});
