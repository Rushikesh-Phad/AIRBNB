//Require Express 
const express = require("express");

//Create Router Object
const router = express.Router();

//Requiring wrapAsync
const wrapAsync = require("../utils/wrapAsync");

//Requiring passport
const passport = require("passport");

//Requiring saveRedirectUrl
const { saveRedirectUrl } = require("../middleware.js");

//Requiring controller
const userController = require("../controllers/users.js");

router.get("/signup", 
    userController.renderSignupForm
);

router.post("/signup", 
    wrapAsync(userController.signup)
);

router.get("/login", 
    userController.renderLoginForm
);

router.post("/login", 
    saveRedirectUrl, 
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout", 
    userController.logout
);

module.exports = router;