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

reviewController.createReview = async (req, res, next)  => {
    const { userId, review, restaurantAddress, restaurantName } = req.body;
    let newRestaurantId

    // Check if the restaurant already exists
    const checkRestaurant = 'SELECT restaurant_id FROM restaurants WHERE address = $1';
    const restaurantResult = await db.query(checkRestaurant, [restaurantAddress]);
    if (restaurantResult.rows.length) newRestaurantId = restaurantResult.rows[0].restaurant_id;

    if (restaurantResult.rows.length === 0) {
      // Restaurant doesn't exist, so insert it
      const insertQuery = 'INSERT INTO restaurants (name, address) VALUES ($1, $2) RETURNING restaurant_id';
      const insertResult = await db.query(insertQuery, [restaurantName, restaurantAddress]);
      newRestaurantId = insertResult.rows[0].restaurant_id;
      console.log(`Added restaurant with ID ${newRestaurantId}`);
    } else {
      console.log('Restaurant already exists');
    }

    const checkRecs = 'SELECT recs_id FROM recs WHERE user_id = $1 AND restaurant_id = $2';
    const recsResult = await db.query(checkRecs, [userId, newRestaurantId]);
    let recQuery
    let values = []

    if (recsResult.rows.length === 0) {
      recQuery = `
      INSERT INTO recs 
      (user_id, restaurant_id, review) 
      VALUES($1, $2, $3) returning *;`;
      values = [parseInt(userId), parseInt(newRestaurantId), review];
    }
    else {
      recQuery = `
      UPDATE recs 
      SET review = $1 
      WHERE recs_id = $2;`;
      values = [review, parseInt(recsResult.rows[0].recs_id)];
    }

    db.query(recQuery, values) 
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