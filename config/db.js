// File: config/db.js
// Description: This file contains the database connection configuration for the application.
// It uses the mongoose library to connect to a MongoDB database.

const mongoose = require('mongoose');
// Load environment variables from .env file
const uri = process.env.MONGODB_URI;

const mongoDbConnection = async ()=>{
    try{
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('Connected to database');
    }
    catch(err){
        console.log(err);
    }
}
module.exports = mongoDbConnection;