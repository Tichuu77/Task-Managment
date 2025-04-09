const express = require('express');
const cors = require('cors');
const mongoDbConnection = require('./config/db');
const userAuthRouter = require('./routes/userAuthRoute');
const userCURDRouter = require('./routes/userCURDRoute');
require('dotenv').config();
 

const app = express();

// Connect to MongoDB
 mongoDbConnection()
 

// middleware
app.use(cors({ origin: process.env.CLIENT_URL  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// server get routes
app.get('/', (req, res) => {
  res.send('Welcome to the Task Managment API');
})

//routes
app.use('/user/auth',userAuthRouter)
app.use('/user',userCURDRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
