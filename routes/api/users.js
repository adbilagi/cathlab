/**
 * this file containes routs of users */

const express = require("express");
const router = express.Router();
module.exports =router;

const jwt = require("../../middleware/usermiddleware");
const userConn = require("../../model/userConn")// user schema
 
// @route POST
// descrpiton This return jwt token with cookie on success login
router.post("/login", (req, res)=>{
 
    try {
        let user = req.body.user;
        let password = req.body.password;
        userConn.find({user : user, password : password}, (err, data)=>{
            if(err){
                res.status(500).send(err);
                return;
            }else{
                if(data[0]){
                    let token = jwt.createJWTToken(data[0].user, data[0].password);
                    res.cookie("JWToken", token, {maxAge: 9000000, httpOnly : true});
                    res.status(200).send("created jwt cookie");
                }else{
                    res.status(500).end("invalid login");

                }

            }
        });

               
    } catch (error) {
        res.status(500).send(error);
    }



})

// @route GET
// description This loges out the clien by setting JEToken to nil
router.get("/logout", function(req, res){
    jwt.signout(req, res, false);
});

// @route POST
// descrition This is for signing in new user needs validatation by user role  permission
// jwt.validateLogin this middle ware return jwtPayload {user : user, role : role}
 router.post("/signup", jwt.validateLogin,function(req, res){
    let signData = {
        user : req.body.user,
        email : req.body.user,
        password : req.body.password,
        phone: req.body.phone
    }
    userConn.create(signData).then((data)=>{
        res.status(200).send("created new user");
    }).catch((err)=>{
        res.status(500).send(err);
        
    });

 })
