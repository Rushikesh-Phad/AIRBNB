//Require Express 
const express = require("express");

//Create Router Object
const router = express.Router({mergeParams: true});

//Requiring wrapAsync
const wrapAsync = require("../utils/wrapAsync.js");

//Requiring validateReviews & isLoggedIn & isreviewAuthor Middleware
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");

//Requiring controller
const reviewController = require("../controllers/reviews.js");

//Review - Post Route
router.post("/",  
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));

//Delete - Review Route
router.delete("/:reviewId", 
    isLoggedIn,
    isreviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;