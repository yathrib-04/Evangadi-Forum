// db connection 
const dbconnection = require("../DB/dbConfig")
const bcrypt = require("bcrypt");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

async function register(req, res) {
    const {username, firstname, lastname, email, password} = req.body;
    if (!username || !firstname || !lastname || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }
  
    try {
        const [user] = await dbconnection.query("select username, userid from users WHERE username = ? or email = ?", [username, email]);
        if (user.length > 0) {
            return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
        }
        if (!strongPasswordRegex.test(password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await dbconnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)", [username, firstname, lastname, email, hashedPassword]);
        return res.status(StatusCodes.CREATED).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "something went wrong please try again" });

    }

}

async function login(req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
    }
    try {
        const [user] = await dbconnection.query("select userid, username,email, password from users WHERE email = ?", [email]);
        if (user.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid credentials" });
        }
     
        // Compare the password    
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid credentials" });
        }
       
        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(StatusCodes.OK).json({ message: "User logged in successfully", token, username, userid });

    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "something went wrong please try again" });
    }
}

async function check(req, res) {
    const username = req.user.username;
    const userid = req.user.userid;
    res.status(StatusCodes.OK).json({ message: "valid user ", username, userid });
}




// Delete a user. Callers may only delete their own account - without this check
// any authenticated user could delete anyone else by guessing an id.
async function deleteUser(req, res) {
    const { userid } = req.params; // get the user ID from URL

    if (Number(userid) !== Number(req.user.userid)) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "You can only delete your own account" });
    }

    try {
        const [user] = await dbconnection.query("SELECT userid FROM users WHERE userid = ?", [userid]);
        if (user.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        await dbconnection.query("DELETE FROM users WHERE userid = ?", [userid]);
        return res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error.message);
        // questions/answers reference users with ON DELETE RESTRICT
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Cannot delete an account that still has questions or answers",
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
}

module.exports = { register, login, check, deleteUser };