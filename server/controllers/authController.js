const db = require('../models/userModel');

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
        const createQuery = `INSERT INTO users (username, password, email, full_name) VALUES ($1, $2, $3, $4) RETURNING username, email, full_name`
        const createValues = [username, password, email, fullName]
        const createResponse = await db.query(createQuery, createValues);
        const userInfo = createResponse.rows[0];
        res.locals.userInfo = {
            fullName: userInfo.full_name,
            email: userInfo.email,
            username: userInfo.username,
        }

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
    try {
        const loginQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const loginValues = [username, password];
        const login = await db.query(loginQuery, loginValues);
        // edge case where username/password are wrong
        if (login.rows.length === 0) {
            res.locals.loginError = true;
        };
        const userInfo = login.rows[0];
        res.locals.userInfo = {
            username: userInfo.username,
            fullName: userInfo.full_name,
            email: userInfo.email,
        };

        return next();
    } catch (err) {
        console.log(err);
        return next({
            log: 'error at authController.login',
            message: 'error logging in'
        });
    };
};

module.exports = authController;