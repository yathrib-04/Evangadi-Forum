const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { postQuestion, allQuestions, singleQuestion } = require("../Controller/questionController");

// Post a new question
router.post("", authMiddleware, postQuestion);

// Get all questions
router.get("", authMiddleware, allQuestions);

// Get a single question
router.get("/:questionid", authMiddleware, singleQuestion);

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API endpoints for managing questions
 */

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "How to connect Node.js to MySQL?"
 *               description:
 *                 type: string
 *                 example: "I want to know how to connect Node.js to a MySQL database."
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of questions
 *       404:
 *         description: No questions found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/questions/{questionid}:
 *   get:
 *     summary: Get a single question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the question
 *     responses:
 *       200:
 *         description: Question found
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */


module.exports = router;
