const express = require('express')
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', authController.register, (req, res) => {
    if (res.locals.alreadyUsed) {
        return res.status(409).json('username/email already in use')
    } else {
        return res.status(201).json(res.locals.userInfo);
    }
});

authRouter.post('/login', authController.login, (req, res) => {
    if (res.locals.loginError) {
        return res.status(409).json('incorrect username/password')
    } else {
        return res.status(200).json(res.locals.userInfo);
    }
});

//get all user
authRouter.get('/allusers', authController.getAllUsers, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//get a specifc user
authRouter.get('/:username', authController.getUser, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//add friend
authRouter.post('/addfriend', authController.follow, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//delete friend
authRouter.delete('/removefriend', authController.unfollow, (req, res, next) => {
    return res.status(200).json('Friend relationship deleted successfully');
});


module.exports = authRouter; 