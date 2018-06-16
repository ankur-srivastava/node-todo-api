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

  /*Create a new Document TodoApp and add data*/
  // db.collection('Todos').insertOne(
  //   {
  //     text:'something to do',
  //     completed:false
  //   },
  //   (err, res)=>{
  //     if(err){
  //       return console.log('Unable to insert data to TodoApp', err);
  //     }
  //     console.log(JSON.stringify(res.ops, undefined, 2));
  //   });

  /*Create a new Document Users and add data*/
  db.collection('Users').insertOne(
    {
      name:'Anks',
      age:35,
      location:500032
    },
    (err, res)=>{
      if(err){
        return console.log('Unable to insert data to TodoApp', err);
      }
      console.log(JSON.stringify(res.ops, undefined, 2));
    }
  );

  client.close();
});
