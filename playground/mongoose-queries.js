const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var todo_db_id = '5b27029f665812035ad30c21';
var user_db_id = '5b25b0da42c6d703bf9025cf';

if(!ObjectID.isValid(todo_db_id)){
  console.log('Todo ID not valid');
}

if(!ObjectID.isValid(user_db_id)){
  console.log('User ID not valid');
}

/*
  Methods provided by Mongoose to query DB
*/

Todo.find({
  _id:todo_db_id
}).then((todos)=>{
  console.log('Todos',todos);
});

Todo.findOne({
  _id:todo_db_id
}).then((todo)=>{
  console.log('Todo', todo);
});

Todo.findById(todo_db_id).then((todo)=>{
  console.log('Todo by ID', todo);
});

User.findById(user_db_id).then((user)=>{
  console.log('User by ID', user);
});
