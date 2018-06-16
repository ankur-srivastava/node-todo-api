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

  /*The below code gets us all the todos available in the Todos collection*/
  db.collection('Todos').find().toArray().then((docs)=>{
    console.log('All the Todos');
    console.log(JSON.stringify(docs,undefined,2));
  }, (err)=>{
    if(err){
      console.log('Error', err);
    }
  });

  /*
    The below code gets us specific todos available in the Todos collection.
    Observe the find method below in which we pass a key value pair.
    We can also query by _id. To do this we need to use ObjectID
  */
  db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
  //db.collection('Todos').find({_id:new ObjectID('5b2461c90b8fb4037208f4b4')}).toArray().then((docs)=>{
    console.log('Todos that are not completed yet');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err)=>{
    if(err){
      console.log('Error', err);
    }
  });

  /*
    The below code gets us the todo count.
  */
  db.collection('Todos').find().count().then((count)=>{
    console.log('Total Number of Todos', count);
  }, (err)=>{
    if(err){
      console.log('Error', err);
    }
  });

  /*
    Query Users Collection
  */
  db.collection('Users').find().toArray().then((docs)=>{
    console.log('Data from Users');
    console.log(JSON.stringify(docs,undefined,2));
  }, (err)=>{
    if(err){
      console.log('Error', err);
    }
  });

  //client.close();
});
