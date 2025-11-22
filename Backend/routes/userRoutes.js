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


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user authentication and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "yathrib"
 *               firstname:
 *                 type: string
 *                 example: "Yathrib"
 *               lastname:
 *                 type: string
 *                 example: "Aman"
 *               email:
 *                 type: string
 *                 example: "yathribaman@gmail.com"
 *               password:
 *                 type: string
 *                 example: "0987654321"
 *              
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "yathribaman@gmail.com"
 *               password:
 *                 type: string
 *                 example: "0987654321"
 *     responses:
 *       200:
 *         description: User logged in successfully with JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */


module.exports = router


