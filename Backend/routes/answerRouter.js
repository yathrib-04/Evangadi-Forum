const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

// Answer controller
const { postAnswer, getAnswers } = require("../Controller/answerController");

// Apply authentication middleware to all answer routes
router.use(authMiddleware);

// Post an answer
router.post("", postAnswer);

// Get answers for a question
router.get("/:questionid", getAnswers);

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: API endpoints for posting and retrieving answers
 */

/**
 * @swagger
 * /api/answers:
 *   post:
 *     summary: Post an answer to a question
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questionid
 *               - answer
 *             properties:
 *               questionid:
 *                 type: string
 *                 example: "facc734a-d6aa-407d-8dd6-1a91772223cf"
 *               answer:
 *                 type: string
 *                 example: "You can use mysql2 package and connect using createConnection."
 *     responses:
 *       201:
 *         description: Answer posted successfully
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/answers/{questionid}:
 *   get:
 *     summary: Get all answers for a specific question
 *     tags: [Answers]
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
 *         description: List of answers
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */


module.exports = router;

