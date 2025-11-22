const dbConnection = require("../DB/dbConfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const{v4:uuidv4} = require("uuid");

// POST /api/question
async function postQuestion(req, res) {
    const userid = req.user.userid; // from authMiddleware
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Bad Request",
            message: "Please provide all required fields"
        });
    }

    try {
          const questionid = uuidv4(); // generate unique questionid
        await dbConnection.query(
            `INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)`,
            [questionid, userid, title, description]
        );

        return res.status(StatusCodes.CREATED).json({
            message: "Question created successfully"
        });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
}

// GET /api/question
async function allQuestions(req, res) {
    try {
        const [rows] = await dbConnection.query(
            `SELECT 
                q.questionid,
                q.title,
                q.description,
                u.username,
                q.created_at
             FROM questions q
             JOIN users u ON q.userid = u.userid
             ORDER BY q.created_at DESC`
        );

        if (rows.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Not Found",
                message: "No questions found."
            });
        }

        return res.status(StatusCodes.OK).json({ questions: rows });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
}

// GET /api/question/:questionid
async function singleQuestion(req, res) {
    const questionId = req.params.questionid;

    try {
        const [rows] = await dbConnection.query(
            `SELECT 
                q.questionid,
                q.title,
                q.description,
                u.username,
                q.created_at
             FROM questions q
             JOIN users u ON q.userid = u.userid
             WHERE q.questionid = ?`,
            [questionId]
        );

        if (rows.length == 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Not Found",
                message: "The requested question could not be found."
            });
        }

        return res.status(StatusCodes.OK).json({ question: rows[0] });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
}

module.exports = { postQuestion, allQuestions, singleQuestion };
