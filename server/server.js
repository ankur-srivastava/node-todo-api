/*Environment variables setup in config file*/
require('./config/config');

const lodash = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const {ObjectID} = require('mongodb');

/*
  Body Parser is used to parse body to send JSON data
  Define Routes here
  Mongoose Database Connect Code is available in /mongoose.js
  Model Definitions are available in /model
*/
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;

/*The middleware below let's us send body as a JSON object*/
app.use(bodyParser.json());

app.post('/todos', authenticate, (req,res)=>{
  var newTodo = new Todo({
    text:req.body.text,
    _creator:req.user._id
  });
  newTodo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req,res)=>{
  Todo.find({
    _creator:req.user._id
  }).then((todos)=>{
    res.send({
      todos
    });
  }, (err)=>{
    res.status(400).send(err);
  });
});

//GET todos/123
app.get('/todos/:id', authenticate, (req,res)=>{
  //Get the id from URL
  //Use 5b27029f665812035ad30c21 in URL
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid Todo ID');
  }
  Todo.findOne({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.send('No Todo');
    }
    return res.send(todo);
  }).catch((e)=>{
    res.status(400).send(e);
  });

});

app.delete('/todos/:id', authenticate, (req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid Todo ID');
  }

  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send('No todo exists');
    }

    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate, (req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid Todo ID');
  }
  /*Properties user can update*/
  var body = lodash.pick(req.body, ['text', 'completed']);

  if(lodash.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id:id, _creator:req.user._id}, {$set:body}, {new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send('No todo exists');
    }

    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });;

});

/*
  Users
*/
app.post('/users',(req,res)=>{
  var body = lodash.pick(req.body, ['email', 'password']);
  var newUser = new User(body);
  newUser.save().then((user)=>{
    /*
      When we need to perform DB operation we should send an auth token for the user to ensure it's a valid request.
      This token can be generated for the user when the user gets created or logs in
    */
    user.save().then(()=>{
      return user.generateAuthToken();
    }).then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }, (e)=>{
    res.status(400).send(e);
  });
});

/*This route needs authentication available in authenticate.js*/
app.get('/users/me',authenticate, (req,res)=>{
  res.send(req.user);
});

/*This Route lets user log in*/
app.post('/users/login', (req,res) => {
  var body = lodash.pick(req.body,['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  })
  .catch((e)=>{
    res.status(400).send(e);
  });

});

app.delete('/users/me/token', authenticate, (req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }, (e)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log('Server is up at', port);
});

module.exports = {
  app
};
