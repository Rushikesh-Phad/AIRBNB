//Require express
const express = require("express");

//Router Object
const router = express.Router();


//USERS
//Index - users
router.get("/", (req, res) => {
    res.send("GET for users");
});

//Show - users
router.get("/:id", (req, res) => {
    res.send("GET for show user id");
});

//POST - users
router.post("/", (req, res) => {
    res.send("POST for show users");
});

//DELETE - users
router.delete("/:id", (req, res) => {
    res.send("DELETE for user id");
});

module.exports = router;