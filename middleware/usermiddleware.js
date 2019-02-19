/**
 * This file containes middle ware for users 
 *   */
const jwt = require("jsonwebtoken");
const SECRETKEY = "Umesh"

// @this fun create new token from user and role
let createJWTToken = (user, role)=>{
    let token = jwt.sign({"user": user, "role" : role}, SECRETKEY);
    return token;
}

module.exports.createJWTToken = createJWTToken;

let validateLogin =(req, res, next)=>{
    try {
        let token = req.cookies.JWToken;
        let payload =jwt.verify(token, SECRETKEY);
        req.jwtPayload = payload;
        next();
    } catch (error) {
        res.status(500).send("invalid access ")
    }
 
}
module.exports.validateLogin =validateLogin
