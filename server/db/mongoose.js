var mongoose = require('mongoose');
/*Add Promise and Connect to database*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
