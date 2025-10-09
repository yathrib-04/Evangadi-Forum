function register(req, res) {
    res.send("User registered");
}
function login(req, res) {
    res.send("User logged in");

}

function check(req, res) {
    res.send("User is logged in");
}

module.exports = { register, login, check };