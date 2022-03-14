const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const postRoutes = require("./Routes/posts");
const userRoutes = require("./Routes/user");

mongoose.connect('mongodb+srv://'+process.env.MONGO_ID+':'+process.env.MONGO_PW+'@cluster0.prcxk.mongodb.net/SM')
.then(()=> console.log('Connected to MongoDB Successfully!'))
.catch(()=> console.log('Connection Failed!'));

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/",express.static(path.join(__dirname,"angular")))

//routes
app.use('/api/posts',postRoutes)
app.use('/api/user', userRoutes)
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
})

module.exports = app;
