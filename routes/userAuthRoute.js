const erpress = require('express');
const { registerUser, loginUser } = require('../controllers/userAuthController');

const userAuthRouter = erpress.Router();

userAuthRouter.post('/register', registerUser)

userAuthRouter.get('/login', loginUser)

module.exports = userAuthRouter;