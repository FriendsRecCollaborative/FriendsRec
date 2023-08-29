const router = require('express').Router();
const userController = require('../controller/userController');

//create a user
router.post('/create', userController.createUser, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//get all user
router.get('/allusers', userController.getAllUsers, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//get a specifc user
router.get('/:username', userController.getUser, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//add friend
router.post('/addfriend', userController.follow, (req, res, next) => {
    return res.status(200).json(res.locals);
});

//delete friend
router.delete('/removefriend', userController.unfollow, (req, res, next) => {
    return res.status(200).json('Friend relationship deleted successfully');
});

module.exports = router;




