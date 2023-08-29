const db = require('../models/userModel');
const reviewController = {};

reviewController.getAllReviews = (req, res, next) => {
  const query = 'SELECT * FROM recs';
  console.log('reached');
  db.query(query) 
    .then((data) => {
        res.locals = data.rows;
        return next();
    }).catch((err) => {
        return next({
            log: `Error encountered in databaseController.reveiewController, ${error}`,
            message: 'Error encountered when querying the database for getting all reviews',
          })
    });  
};

reviewController.getUserReview = (req, res, next)  => {
    const { id } = req.params;
    const query = `
    SELECT *
    FROM recs
    JOIN users
    ON recs.user_id = users.user_id
    WHERE users.user_id = $1;
    `;
    const values = [parseInt(id)];

    db.query(query, values) 
    .then((data) => {
        res.locals.reviews = data.rows;
        return next();
    }).catch((err) => {
        return next({
            log: `Error encountered in databaseController.reveiewController, ${error}`,
            message: 'Error encountered when querying the database for getting a user reviews',
          })
    }); 
    

};

reviewController.createReview = (req, res, next)  => {
    const { userId, restaurantId, review } = req.body;
    const query = `
    INSERT INTO recs 
    (user_id, restaurant_id, review) 
    VALUES($1, $2, $3) returning *;`;
    const values = [parseInt(userId), parseInt(restaurantId), review];

    db.query(query, values) 
    .then((data) => {
        res.locals = data.rows;
        return next();
    }).catch((err) => {
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
        }).catch((err) => {
            return next({
                log: `Error encountered in databaseController.reveiewController, ${error}`,
                message: 'Error encountered when querying the database for deleting reviews',
              })
        });
}


module.exports = reviewController;