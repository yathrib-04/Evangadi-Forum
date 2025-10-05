const express = require('express');
const router = express.Router();


// register routes
router.post("/register", (req, res) => {
  res.send("Register endpoint");
});


// login routes
router.post("/login", (req, res) => {
  res.send("Login endpoint");
});

// check login
router.get("/check", (req, res) => {
  res.send("Check login endpoint");
});
module.exports = router;


