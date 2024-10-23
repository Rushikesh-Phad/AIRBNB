if(process.env.NODE_ENC != "production"){
    require("dotenv").config();
}
console.log(process.env.SECRET);

//Requiring Express
const express = require("express");
const app = express();

//Requiring Mongoose
const mongoose = require("mongoose");

//Requiring Path
const path = require("path");

//Requiring Methodoverride
const methodOverride = require("method-override");

//Requiring EJS Mate
const ejsMate = require("ejs-mate");

//Requiring listing.js
const listingRouter = require("./routes/listing.js");

//Requiring review.js
const reviewRouter = require("./routes/review.js");

//Requiring user.js
const userRouter = require("./routes/user.js");

//Requiring express sessions
const session = require("express-session");

//Requiring flash
const flash = require("connect-flash");

//Requiring passport
const passport = require("passport");

//Requiring local strategy
const LocalStrategy = require("passport-local");

// requires the model with Passport-Local Mongoose plugged in
const User = require("./models/user.js");

//Requiring ExpressError
const ExpressError = require("./utils/ExpressError.js");
const { isFloat64Array } = require("util/types");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

//Database ke liye async-function
main()
.then(() => {
    console.log("connected to  DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/solivagant');
}

//Defining session options
const sessionOptions = { 
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

//Basic API
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

//To use session
app.use(session(sessionOptions));
//To use flash (routes ke pahale flash ko use karna padenga na mera bhai)
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//Error Handling Middleware :
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Someting Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
}) ;

//Starting - Server
app.listen(8080, () => {
    console.log("server is listening at port 8080");
});