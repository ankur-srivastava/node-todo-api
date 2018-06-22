# Description
A simple application to manage ToDo s. Developed using Node.js and MongoDB

In this Application we use mongodb native module to connect to mongo database.

http://mongodb.github.io/node-mongodb-native/3.0/api/Cursor.html#toArray

To see this in action:

1. Run npm install
2. You should have a mongo db up and running.
3. This Application uses the following
    DB URL : mongodb://localhost:27017/TodoApp
4. Two collections are used - Todos and Users    
5. Go to /playground folder and then run the files. Like node mongodb-connect.js

About the files:

/server/server.js : Contains the Express Routes, API endpoints like POST /todos. These can be tested using POSTMAN.
/server/models : Contains the models.
/server/db : Connects to MongoDB using mongoose library. Creates a new model Todo and saves data.

package-json has scripts to run the unit tests.

For each file you can uncomment the methods to test them out.

---ENV Variable---

We can set NODE_ENV variable so that test database can be used by test files. Changes made-
1. In package.json : "test": "export NODE_ENV=test ...
2. We dont modify start script. We set it to development locally. Heroku sets it to production.
3. In server.js changes are made. And a config file is used to setup env variables.

---Auth Token---
For JWT Token functionality refer to user.js and server.js

---Heroku---

Changes made to server.js, package.json for Heroku.
In package.json we added: "start":"node server/server.js"

Other steps for Heroku setup:
1. run heroku create
2. We need to add mongodb by using mongolab available on Heroku.
    Run heroku addons:create mongolab:sandbox
3. Run heroku config
4. In mongoose.js file add : mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
5. git push heroku master
