//Requiring Express
const express = require("express");
const app = express();

//Requiring user.js
const users = require("./routes/user.js");

//Requiring posts.js
const posts = require("./routes/post.js");

//Requiring express-session
const session = require("express-session");

//Requiring connect-flash
const flash = require("connect-flash");

//Requiring Path
const path = require("path");

//Using views to display flash
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = { 
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name="anonymous" } = req.query;
    req.session.name = name;
    if(name === "anonymous")
    {
        req.flash("error", "user not registered");
    }
    else
    {
        req.flash("success", "user registered successfully");
    }
    res.redirect("/hello");
});

//name varialble access ho payega page.ejs me - samja yede!!
app.get("/hello", (req, res) => {
   res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//     if(req.session.count)
//     {
//         req.session.count++;
//     }
//     else
//     {
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("test successful");
// });

// //Requiring cookie-parser
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", {signed:true});
//     res.send("signed cookie sent");
// });

// //COOKIES
// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "hello");
//     res.cookie("origin", "India")
//     res.send("We sent you somw cookies!");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/greet", (req, res) => {
//     let { name  = "anynomous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// });

// //Basic Route
// app.get("/", (req, res) => {
//     console.log(req.cookies);
//     res.send("Hi, I am root!");
// });

// //Requiring - Users
// app.use("/users", users);

// //Requiring - Post
// app.use("/posts", posts);

app.listen(3000, () => {
    console.log("server is listening to 3000");
});