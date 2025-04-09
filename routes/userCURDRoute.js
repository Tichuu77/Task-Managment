const express = require('express');
const protect = require('../middelwares/authMiddleware');
const getUserProfile = require('../controllers/userCURDController');

const userCURDRouter = express.Router();

userCURDRouter.use(protect)

userCURDRouter.get('/',getUserProfile)

module.exports = userCURDRouter;