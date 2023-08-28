const router = require('express').Router();
const reviewController = require('../controller/reviewController');

router.get('/allreviews', reviewController.getALlReviews, (req, res, next) => {
    return res.status(200).json(res.locals)
});

router.get('/:id', reviewController.getUserReview, (req, res, next) => {
    return res.status(200).json(res.locals.reviews);
});

router.post('/add', reviewController.createReview, (req, res, next) => {
    return res.status(200).json(res.locals);
});


router.delete('/delete/:id', reviewController.deleteReview, (req, res, next) => {
    return res.status(200).json('The post has been succesfully deleted');
});

module.exports = router;