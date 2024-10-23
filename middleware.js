//Requiring Listing Model
const Listing = require("./models/listing");

//Requiring ExpressError
const ExpressError = require("./utils/ExpressError.js");

//Requiring Review Model From review.js
const Review = require("./models/review.js");


//Requiring schema.js
const { listingSchema } = require("./schema.js");

//Requiring schema.js
const { reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated())
        {
            req.session.redirectUrl = req.originalUrl;
            req.flash("error", "You Must Be Logged In To Create Listing!");
            return res.redirect("/login");
        }
        next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) 
    {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You Are Not The Owner Of This Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//Validation for listing schema - Middleware
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};

//Validation for review schema - Middleware
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};

module.exports.isreviewAuthor = async (req, res, next) => {
    let { id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You Are Not The Author Of This Review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};