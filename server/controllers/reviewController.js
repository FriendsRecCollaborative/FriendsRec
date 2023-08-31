const db = require('../models/userModel');
const reviewController = {};

reviewController.getAllReviews = (req, res, next) => {
  const query = 'SELECT * FROM recs';
  db.query(query) 
    .then((data) => {
        res.locals = data.rows;
        return next();
    }).catch((error) => {
        return next({
            log: `Error encountered in databaseController.reveiewController, ${error}`,
            message: 'Error encountered when querying the database for getting all reviews',
          })
    });  
};

reviewController.getUserReview = (req, res, next)  => {
    const { id } = req.params;
    const query = `
    SELECT u.username, u.full_name, r.name, r.address, recs.review
    FROM recs
    JOIN users AS u ON recs.user_id = u.user_id
    JOIN restaurants AS r ON recs.restaurant_id = r.restaurant_id
    WHERE u.user_id = $1`
    const values = [parseInt(id)];

    db.query(query, values) 
    .then((data) => {
        res.locals.reviews = data.rows;
        return next();
    }).catch((error) => {
        return next({
            log: `Error encountered in databaseController.reveiewController, ${error}`,
            message: 'Error encountered when querying the database for getting a user reviews',
          })
    }); 
    

};

reviewController.createReview = (req, res, next)  => {
    const { userId, restaurantId, review, address } = req.body;
    const query = `
    INSERT INTO recs 
    (user_id, restaurant_id, review, address) 
    VALUES($1, $2, $3, $4) returning *;`;
    const values = [parseInt(userId), parseInt(restaurantId), review];

    db.query(query, values) 
    .then((data) => {
        res.locals = data.rows;
        return next();
    }).catch((error) => {
        return next({
            log: `Error encountered in databaseController.reveiewController, ${error}`,
            message: 'Error encountered when querying the database for creating reviews',
          })
    });  
};



reviewController.deleteReview = (req, res, next)  => {
    const { id } = req.params;
    const query = "DELETE FROM recs WHERE recs_id = $1";
    const values = [parseInt(id)];

    db.query(query, values)
        .then((data) => {
            return next();
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.reveiewController, ${error}`,
                message: 'Error encountered when querying the database for deleting reviews',
              })
        });
}


module.exports = reviewController;