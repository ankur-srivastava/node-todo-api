var {User} = require('./../models/user');

/*Authentication Middleware*/
var authenticate = (req,res,next)=>{
  //Get the token
  var token = req.header('x-auth');
  //Validate the token
  User.findByToken(token).then((user)=>{
    if(!user){
      //Below code triggers catch block
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e)=>{
    console.log('server.js : In catch block');
    res.status(401).send();
  });
};

module.exports = {
  authenticate
};
