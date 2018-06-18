const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

/*
  Body Parser is used to parse body to send JSON data
  Define Routes here
  Mongoose Database Connect Code is available in /mongoose.js
  Model Definitions are available in /model
*/
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
/*The middleware below let's us send body as a JSON object*/
app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
  var newTodo = new Todo({
    text:req.body.text
  });
  newTodo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.listen(port, ()=>{
  console.log('Server is up at', port);
});

module.exports = {
  app
};
