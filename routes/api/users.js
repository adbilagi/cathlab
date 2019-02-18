/**
 * this file containes routs of users */
const express = require("express");
const jwt = require("jwt-login");
const router = express.Router();
module.exports =router;

const users = require("../../model/test")//this for testing
 
// Login Route
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
           jwt.sign(req, res, user, "tuuyyu",120, false);
         }else{
             throw "Invalid Login"
         }
        
    } catch (error) {
        res.status(500).send(error);
    }



})
// logout route
router.get("/logout", function(req, res){
    jwt.signout(req, res, false);
});


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
