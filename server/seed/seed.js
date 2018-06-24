const {ObjectID} = require('mongodb');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const jwt = require('jsonwebtoken');

/*
  Before running each test we delete the data in todo collection
  We also create a mock array of todos so that GET /todos works
  To handle this we modify the POST /todos unit tests.
*/
const todos = [
  {
    _id:new ObjectID(),
    text:'First Todo'
  },{
    _id:new ObjectID(),
    text:'Second Todo',
    completed:true,
    completedAt:123
  }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id:userOneId,
    email:'ankurs@gmail.com',
    password:'abc123',
    tokens:[
      {
        access:'auth',
        token:jwt.sign({_id:userOneId, access: 'auth'}, 'somesecret').toString()
      }
    ]
  },{
    _id:userTwoId,
    email:'adityas@gmail.com',
    password:'abc123'
  }
];

const populateTodos = (done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>{
    done();
  });
};

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then(() => done());
  });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};