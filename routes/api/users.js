/**
 * this file containes routs of users */

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
module.exports =router;

const users = require("../../model/test")//this for testing
 
// @route POST
// descrpiton This return jwt token with cookie on success login
router.post("/login", (req, res)=>{
    let user = req.body.user;
    let password = req.body.password;
    let login=false;
   
    try {
            //for testing purpose` 
        users.users.forEach((curUser)=>{
            if(curUser.user === user && curUser.password === password){
                login=true;
            }
        })
        
        if(login){
            console.log(user);
        //    jwt.sign(req, res, user, "tuuyyu",120, false);
            
           let token = jwt.sign({"user": user, "role" : "admin"}, "Umesh");
           console.log(token);
           res.cookie("JWToken", token, { httpOnly : true});
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
 router.post("/signin", function(req, res){
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