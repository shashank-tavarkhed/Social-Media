const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require("../Models/user")

exports.createUser = (req,res)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash =>{
    const user = new userModel({
      email : req.body.email,
      password: hash
    })
    user.save()
    .then((result)=>{
      console.log('User created');
      res.status(200).json({
        message : 'User created!',
        result: result,
      })
   }).catch(err =>{
      res.status(500).json({
        message:"User already exists!."
      })
   })
 })
}

exports.loginUser = (req,res)=>{
  let currentUser;
  userModel.findOne({email: req.body.email})
  .then(user => {
    if(!user){
      return res.status(401).json({
        message: "Authentication Failed!",
      })
    }
    currentUser = user;
    return bcrypt.compare( req.body.password ,user.password)
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        message: "Authentication Failed!",
      })
    }
    //user Authentication
    const token = jwt.sign({email:currentUser.email ,userID: currentUser._id}, process.env.SECRET_KEY,{expiresIn : '1h'});
    // console.log('token>>> ', token);
      res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: currentUser._id,
    })
  })
  .catch(err=>{
    return res.status(401).json({
      message: "Authentication Failed!",
      error: err,
    })
  })
}
