const db = require('../models/databaseModels');
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
const userController = {};

userController.createUser = (req, res, next) => {
    const { username, password, fullName, email } = req.body;
    const query = `
    INSERT INTO users 
    (username, password, full_name, email)
    VALUES($1, $2, $3, $4) returning *;`;
    const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
    const values = [username, hashPassword, fullName, email];
    db.query(query, values)
        .then((data) => {
            res.locals = data.rows;
            return next();
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.userController, ${error}`,
                message: 'Error encountered when querying the database for users',
            })
        });
};

userController.getAllUsers = (req, res, next) => {
    const query = 'SELECT * FROM users';
    db.query(query)
        .then((data) => {
            res.locals = data.rows;
            return next();
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.userController, ${error}`,
                message: 'Error encountered when querying the database for users',
            });
        });
};

userController.getUser = (req, res, next) => {
    const { username } = req.params;
    const query = 'SELECT * FROM users where username = $1';
    const values = [username];
    db.query(query, values)
        .then((data) => {
            res.locals = data.rows;
            return next();
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.userController, ${error}`,
                message: 'Error encountered when querying the database for users',
            });
        })
};

userController.follow = (req, res, next) => {
    const { userId, friendId } = req.body;
    const query = `INSERT into friends (user_id, friend_id) VALUES($1, $2) returning *;`;
    const values = [parseInt(userId), parseInt(friendId)];
    db.query(query, values)
        .then((data) => {
            res.locals = data.rows;
            return next();
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.userController, ${error}`,
                message: 'Error encountered when querying the database for users',
            });
        });
};

userController.unfollow = (req, res, next) => {
    const { relationId } = req.body;
    const query =  `DELETE from friends where relation_id = $1`;
    const values = [parseInt(relationId)];

    db.query(query, values)
        .then((data) => {
            return next();
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.reveiewController, ${error}`,
                message: 'Error encountered when querying the database for deleting reviews',
              });
        });
};

module.exports = userController;