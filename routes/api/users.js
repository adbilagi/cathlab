/**
 * this file containes routs of users */

const express = require("express");
const router = express.Router();
module.exports =router;

const jwt = require("../../middleware/usermiddleware");
const users = require("../../model/test")//this for testing
 
// @route POST
// descrpiton This return jwt token with cookie on success login
router.post("/login", (req, res)=>{
    let user = req.body.user;
    let password = req.body.password;
    let login=false;
    let role=";"
   
    try {
            //for testing purpose` 
        users.users.forEach((curUser)=>{
            if(curUser.user === user && curUser.password === password){
                login=true;
                role=curUser.role;
            }
        })
        
        if(login){
            
           let token = jwt.createJWTToken(user, role)
           res.cookie("JWToken", token, {maxAge: 9000000, httpOnly : true});
           res.status(200).send("created jwt cookie");
         }else{
             throw "Invalid Login"
         }
        
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
 router.post("/signin",jwt.validateLogin, function(req, res){
    try {
        // write code for user role status and permission

        let signData = {
            user : req.body.user,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            phone: req.body.phone
        }
        // write code for 
        res.status(200).send("OK");

        
    } catch (error) {
        req.status(500).send(error)
    }


 })
