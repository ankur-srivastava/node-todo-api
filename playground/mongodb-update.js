const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB');

  const db = client.db('TodoApp');

  /*For update we need to use update operators like $set provided by mongodb*/
  // db.collection('Todos')
  // .findOneAndUpdate(
  //   {
  //     _id:new ObjectID('5b249f979f9e4002d60d5b3e')
  //   },
  //   {
  //     $set:{
  //       completed:true
  //     }
  //   },
  //   {
  //     returnOriginal:false
  //   }
  // ).then((res)=>{
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate(
      {
        _id:new ObjectID('5b24a2669f9e4002d60d5b4f')
      },{
          $set:{
              name:'Ankur'
          }
      },{
        returnOriginal:false
      }
  ).then((res)=>{
    console.log(res);
  });


  //client.close();
});
