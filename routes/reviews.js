const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/WrapAsync');
const Review = require('../models/review');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const ReviewController = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(ReviewController.newReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(ReviewController.deleteReview))

module.exports = router;