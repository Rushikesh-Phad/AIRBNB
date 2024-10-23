//Require Express 
const express = require("express");

//Create Router Object
const router = express.Router();

//Requiring wrapAsync
const wrapAsync = require("../utils/wrapAsync.js");

//Requirin isLoggedIn Middleware
const { isLoggedIn } = require("../middleware.js");

//Requiring isOwner Middleware
const { isOwner } = require("../middleware.js")

//Requiring validateListing Middleware
const { validateListing } = require("../middleware.js");

//Requiring controller
const listingController = require("../controllers/listings.js");

//Requiring multer
const multer = require("multer");

//Requiring cloudConfig.js
const { storage } = require("../cloudConfig.js");

//Initialize
const upload = multer({ storage });

//Index && Create
router
.route("/")
.get(
    wrapAsync(listingController.index)
)
// .post(
//     isLoggedIn, 
//     validateListing, 
//     wrapAsync(listingController.createListing)
// );
.post(upload.single("Listing[image]"), (req, res) => {
    res.send(req.file);
});

//New Route
router.get("/new", 
    isLoggedIn, 
    listingController.renderNewForm
);

//Show && Update && Delete
router.route("/:id")
.get(
    wrapAsync(listingController.showListing)
)
.put(
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.destroyListing)
);

//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;