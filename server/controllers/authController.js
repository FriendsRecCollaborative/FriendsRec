const db = require('../models/userModel');
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
const authController = {};

authController.register = async (req, res, next) => {
    const {username, password, email, fullName} = req.body;
    try {
        const findQuery = `SELECT * FROM users WHERE username = $1 AND email = $2`
        const findValues = [username, email];
        const findUser = await db.query(findQuery, findValues);
        // edge case where username/email is already in use
        if (findUser.rows.length > 0) {
            res.locals.alreadyUsed = true;
            return next();
        }
        // create user if user does not already exist
        const hashPassword = bcrypt.hashSync(password, SALT_ROUND);
        const createValues = [username, hashPassword, email, fullName];
        const createQuery = `INSERT INTO users (username, password, email, full_name) VALUES ($1, $2, $3, $4) RETURNING username, email, full_name`
        const createResponse = await db.query(createQuery, createValues);
        const userInfo = createResponse.rows[0];
        res.locals.userInfo = {
            fullName: userInfo.full_name,
            email: userInfo.email,
            username: userInfo.username,
            user_id: userInfo.user_id,
            joined: userInfo.created_at,
        };

        return next()
    } catch (err) {
        console.log(err);
        return next({
            log: 'error at authController.register',
            message: 'error creating new user'
        });
    };
};

authController.login = async (req, res, next) => {
    const {username, password} = req.body;
    const hash = bcrypt.hashSync(password, SALT_ROUND);
    try {
        const loginQuery = 'SELECT * FROM users WHERE username = $1';
        const loginValues = [username];
        const login = await db.query(loginQuery, loginValues);
        // edge case where username/password are wrong
        console.log(login.rows);
        if (login.rows.length === 0) {
            res.locals.loginError = true;
        };
        
        if (!bcrypt.compareSync(password, login.rows[0].password)) {
            res.locals.loginError = true;
        };

        const userInfo = login.rows[0];
        res.locals.userInfo = {
        username: userInfo.username,
        fullName: userInfo.full_name,
        email: userInfo.email,
        user_id: userInfo.user_id,
        joined: userInfo.created_at,
    };
    return next()
    } catch (err) {
        console.log(err);
        return next({
            log: 'error at authController.login',
            message: 'error logging in'
        });
    }
};

authController.getAllUsers = (req, res, next) => {
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

authController.getUser = (req, res, next) => {
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

authController.follow = (req, res, next) => {
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

authController.unfollow = (req, res, next) => {
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


module.exports = authController;