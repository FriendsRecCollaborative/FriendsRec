const db = require('../models/userModel');
const reviewController = {};

reviewController.getAllReviews = (req, res, next) => {
  const query = `
  SELECT 
    u.full_name AS name,
    r.name AS restaurant_name,
    recs.review,
    recs.created_at
   FROM 
    recs
     JOIN users u ON recs.user_id = u.user_id
     JOIN restaurants r ON recs.restaurant_id = r.restaurant_id`;
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

reviewController.getAllMyReviews = async (req, res, next) => {
    const { id } = req.params;

    const query = `
    SELECT 
        u.full_name AS friend_name,
        r.name AS restaurant_name,
        recs.review,
        recs.created_at
    FROM 
        friends f
    JOIN recs ON f.friend_id = recs.user_id
    JOIN users u ON f.friend_id = u.user_id
    JOIN restaurants r ON recs.restaurant_id = r.restaurant_id
    WHERE 
    f.user_id = $1;
    `;
    const values = [parseInt(id)];
    await db.query(query, values)
        .then((data) => {
            console.log(data.rows)
            res.locals = data.rows;
            return next();
            // let vals = data.rows;
            // for (let i = 0; i < vals.length; i++) {
            //     friends.push(vals[i].friend_id);
            // }
        }).catch((error) => {
            return next({
                log: `Error encountered in databaseController.reveiewController, ${error}`,
                message: 'Error encountered when querying the database for getting a user reviews',
              });    
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
    }).catch((error) => {
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