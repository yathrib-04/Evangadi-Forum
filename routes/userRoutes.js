const express = require('express');
const router = express.Router();


// authentication middleware
const { authMiddleware } = require('../middleware/authMiddleware');
// user controller
const { register, login, check, deleteUser} = require('../Controller/userController');

// register routes
router.post("/register", register);


// login routes
router.post("/login", login);

// check login
router.get("/check", authMiddleware, check);

// delete user route
router.delete("/:userid", authMiddleware, deleteUser);

module.exports = router


