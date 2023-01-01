const jwt = require('jsonwebtoken');
const config = require("../config")
const JWT_SECRET = config.authentication.JWT_SECRET;

const fetchUser = (req, res, next) => {
    // the token will be taken form the header named "auth-token"
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send("Please authenticate using a valid token");
    }

    try {
        const userData = jwt.verify(token, JWT_SECRET);
        console.log(userData); //will log the  "{user: {id: user.id}}"
        req.user = userData.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate useing a valid token");
    }
}

module.exports = fetchUser;