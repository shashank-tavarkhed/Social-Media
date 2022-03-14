const jwt = require('jsonwebtoken');

const auth = function(req,res,next){
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify( token ,process.env.SECRET_KEY);
    req.userData = { email: decodedToken.email, userID: decodedToken.userID};
  next()
  }catch(err){
    res.status(401).json({
      message: "Authentication Failed!"
    })
  }
}


module.exports = auth;
