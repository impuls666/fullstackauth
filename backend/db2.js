
// mongoose.js
const mongoose = require('mongoose').Mongoose;
require('dotenv').config();
const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;

var instance2 = new mongoose();
  instance2.connect(
    `mongodb+srv://${mongo_user}:${mongo_password}@cluster0.wkgm20f.mongodb.net/sample_mflix?retryWrites=true&w=majority`   
  ).then(() => {
    console.log('Connected to db2');
    // Your code here
  })
  .catch((error) => {
    console.error('Error connecting to db2:', error);
  });


module.exports = instance2 
