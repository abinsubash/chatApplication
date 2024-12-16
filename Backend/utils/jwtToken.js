const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()
const jwttoken = (userId) => {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(
        { id: userId },
        secretKey,     
        { expiresIn: "1h" } 
    );
    return token;
};

module.exports = jwttoken;
