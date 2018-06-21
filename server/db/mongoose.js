var mongoose = require('mongoose');
/*Add Promise and Connect to database*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
