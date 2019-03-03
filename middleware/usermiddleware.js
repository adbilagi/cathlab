/**
 * This file containes middle ware for users 
 *   */
const jwt = require("jsonwebtoken");
const SECRETKEY = "Umesh"

// @this fun create new token from user and role
let createJWTToken = (user, role, req, res)=>{
    let token = jwt.sign({"user": user, "role" : role}, SECRETKEY);
    res.cookie("JWToken", token, {maxAge: 50*60*1000, httpOnly : true});
}

module.exports.createJWTToken = createJWTToken;

let validateLogin =(req, res, next)=>{
    try {
        let token = req.cookies.JWToken;
        let payload =jwt.verify(token, SECRETKEY);
        req.jwtPayload = payload;
        createJWTToken(payload.user, payload.role, req, res);
        next();
    } catch (error) {
        res.status(500).send("invalid access ")
    }
 
}
module.exports.validateLogin =validateLogin
