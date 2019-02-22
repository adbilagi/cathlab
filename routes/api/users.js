/**
 * this file containes routs of users */

const express = require("express");
const router = express.Router();
const roles = require("../../roles");
const fileUrl = "/api/users"

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
                    let datajson = {"user" : data[0].user,"role" : data[0].role};
                    let token = jwt.createJWTToken(datajson);
                    res.cookie("JWToken", token, {maxAge: 9000000, httpOnly : true});
                    res.status(200).json(datajson);
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
     
    let curRole = req.jwtPayload.user.role;
    let permission = roles.getRoleRoutePrivilegeValue(curRole, "/api/user/signup", "POST");
    

    if(permission){
        
        let signData = {
            user : req.body.user,
            email : req.body.user,
            password : req.body.password,
            phone: req.body.phone
        }
       
        userConn.create(signData).then((data)=>{
            res.status(200).send(data);
        }).catch((err)=>{
            res.status(500).send(err);
        });
    
    }else{
        res.status(500).send("You do not have this access");
    }
     

 });

//  @route PUT
// description This is changing password

 router.put("/changepassword", jwt.validateLogin, (req, res)=>{
    
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let curUser = req.jwtPayload.user.user;
    let curRole = req.jwtPayload.user.role;

    let permission = roles.getRoleRoutePrivilegeValue(curRole, `${fileUrl}${req.url}`, req.method);

    if(permission){

        userConn.findOneAndUpdate({user : curUser, password : oldPassword}, {password : newPassword},(err, doc, data)=>{
            if(err){
                res.status(500).send("Did not change password");
            }else{
                res.status(200).send("Succefully changed password");
            }
        });
    }else{
        res.status(500).send("You do not have this access");
    }

 });

//  @route PUT
// descrption This is change role of user
router.put("/changerole", jwt.validateLogin, (req, res)=>{
    let curRole = req.jwtPayload.user.role;// this is role of logged in user
    let permission = roles.getRoleRoutePrivilegeValue(curRole, `${fileUrl}${req.url}`, req.method);//permssion  for logged in ser
    if(permission){
        // here code for role change of user whoose role has to be changed , not the logged user
        userConn.findOneAndUpdate({user : req.body.user}, {role : req.body.role}, (err, doc, data)=>{
            if(err){
                res.status(200).send("Successfully changed Role");
            }else{
                res.status(500).send("Did not change role");
            }
        });
    }else{
        res.status(500).send("You do not have this access");
    }

})


// @route GET
// description This is checked on component did mount checks valid jwt to know logged state
 router.get("/validjwt", jwt.validateLogin, (req, res)=>{
    res.status(200).json(req.jwtPayload);
    
 })
