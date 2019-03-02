/**
 * this file containes routs of users */

const express = require("express");
const router = express.Router();
const roles = require("../../roles").role;
const fileUrl = "/api/users"
const roleMiddleware = require("../../roles").roleMiddleware(fileUrl);


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


// @route POST
// descrition This is for signing in new user needs validatation by user role  permission
// jwt.validateLogin this middle ware return jwtPayload {user : user, role : role}
 router.post("/signup", jwt.validateLogin, roleMiddleware, function(req, res){
    if(req.permission){
        let signData = {
            user : req.body.user,
            email : req.body.user,
            password : req.body.password,
            phone: req.body.phone
        }
       
        userConn.create(signData, (err, data)=>{
            if(err){
                res.status(500).send("Could not create new user");
            }else{
                res.status(200).send("Successfully created new user");
            }

        });
    
    }else{
        res.status(500).send("You do not have this access");
    }
     

 });

//  @route PUT
// description This is changing password

 router.put("/changepassword", jwt.validateLogin,roleMiddleware, (req, res)=>{

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let curUser = req.jwtPayload.user.user;
    if(req.permission){
       
        userConn.findOneAndUpdate({user : curUser, password : oldPassword}, {password : newPassword},(err, doc, data)=>{
            if(doc == null){
                res.status(500).send("Did not change password");
            }else if(err){
                res.status(500).send("Did not change password");
            }else{
                res.status(200).send("Successfully changed password");
            }
        });
    }else{
        res.status(500).send("You do not have this access");
    }

 });

//  @route PUT
// descrption This is change role of user
router.put("/changerole", jwt.validateLogin, roleMiddleware,(req, res)=>{
        if(req.permission){
        // here code for role change of user whoose role has to be changed , not the logged user
        userConn.findOneAndUpdate({user : req.body.user}, {role : req.body.role}, (err, doc, data)=>{
            if(err){
                res.status(200).send("Successfully changed Role");
                return;
            }else{
                res.status(500).send("Did not change role");
                return;
            }
        });
    }else{
        res.status(500).send("You do not have this access");
        return;
    }

})


// @route GET
// description This is checked on component did mount checks valid jwt to know logged state
 router.get("/validjwt", jwt.validateLogin, roleMiddleware, (req, res)=>{
     if(req.permission){
        res.status(200).json(req.jwtPayload);
        return;
     }else{
         res.status(500).send("You do not have this access");
     }

    
 })

//  @route GET
// description : this is to get all roles for user roles grooups
router.get("/allroles", jwt.validateLogin, roleMiddleware, (req, res)=>{
    // write code is not complete
   
    const curRoles =roles.getAllRoles();
    res.status(200).send({roles : curRoles});
    return;
})



// @route GET
// Description This route gets all users in database
router.get("/getallusersandroles", (req, res)=>{

  
    userConn.find((err, data)=>{
        res.status(200).send(data);
    })

})



// @route POST
// Description This route gets the role of any given user if not fount returns error
router.post("/userrole", jwt.validateLogin, roleMiddleware, (req, res)=>{
    if(req.permission){
        const curUser = req.body.user;
    userConn.find({user : curUser},(err, data)=>{
        if(err){
            res.status(500).send("Invalid method");
            return;
        }else{
            if(data.length > 0){
                res.status(200).send({role : data[0].role});
                return;
            }else{
                res.status(500).send("Unidentified User");
                return;
            }
        }
    })

    }else{
        res.status(500).send("invalid access for this role");
    }
    
})
