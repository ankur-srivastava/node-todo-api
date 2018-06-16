//const MongoClient = require('mongodb').MongoClient;
/*
  Using Destructuring feature of ES6 we can create a variable from an object property
  We also pull out ObjectID
*/
const {MongoClient, ObjectID} = require('mongodb');

/*Establish connection with MongoDB*/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB');

  const db = client.db('TodoApp');

  //Delete Many
  // db.collection('Todos').deleteMany({text:'Eat'}).then((result)=>{
  //   console.log(result);
  // }, (err)=>{
  //   console.log(err);
  // });

  //Delete one : Works like Delete Many but stops after deleting first match
  // db.collection('Todos').deleteOne({text:'Water'}).then((res)=>{
  //   console.log(res);
  // }, (err)=>{
  //   console.log(err);
  // });

  //Find and Delete One
  // db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
  //   console.log(res);
  // }, (err)=>{
  //   console.log(err);
  // });

  // db.collection('Users').deleteMany({name:'Anks'}).then((res)=>{
  //   console.log(res);
  // });

  // db.collection('Users').findOneAndDelete({_id:new ObjectID('5b2498929f9e4002d60d5b2e')}).then((res)=>{
  //   console.log(res);
  // });



  //client.close();
});
