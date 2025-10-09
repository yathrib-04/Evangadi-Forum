const express = require('express');
const router = express.Router();


// user controller
const { register, login, check } = require('../Controller/userController');

// register routes
router.post("/register", register )


// login routes
router.post("/login", login)  

// check login
router.get("/check",check)

module.exports = router


