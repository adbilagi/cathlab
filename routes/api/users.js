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
                    jwt.createJWTToken(data[0].user, data[0].role, req, res);
                    
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


// @route "GET"
//desription  This route logs out 
router.get("/logout", (req, res)=>{
    res.clearCookie("JWToken");
    res.status(200).send({login : "Login status is false"});
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


/** 
 * =============================================
 * This section for roles
 * ================================================
*/



//  @route PUT
// descrption This is change role of user
router.put("/changerole", jwt.validateLogin, roleMiddleware,(req, res)=>{
    try {
        if(req.permission){
            //check valid roles
            let allRoles = roles.getAllRoles();
            let foundRole = false;
            allRoles.forEach((role)=>{
                if(role === req.body.role){
                    foundRole = true;
                }
            })

            if(!foundRole){
                res.status(500).send("Invalid role option given");
                return;
            }
            // here code for role change of user whoose role has to be changed , not the logged user
            userConn.findOneAndUpdate({user : req.body.user}, {role : req.body.role}, (err, doc, data)=>{
                // check valid user name
                if(doc == null){
                    res.status(500).send("Invalid User name given")
                    return
                }
                // on database err
                if(err){
                    res.status(500).send("Could not change role");
                    return;
                }else{
                    // if succeful then 
                    res.status(200).send("Succussfully changed role");
                    return;
                }
            });
        }else{
            // req.permission false
            res.status(500).send("You do not have this access");
            return;
        }
        
    } catch (error) {
        
        res.status(500).send("Could not change role")
        
    }

})




//  @route GET
// description :  this route gets all  roles and each users and his role 
router.get("/getallusersandroles", jwt.validateLogin, roleMiddleware, (req, res)=>{
    // write code is not complete
    try {
        if(req.permission){
            const curRoles =roles.getAllRoles();
            userConn.find((err, data)=>{
                if(err){
                    res.status(500).send("Could not get user and roles")
                    return;
                }else{
                    let allRoles = roles.getAllRoles();
                    let users = data.map((user, index)=>{
                        return(
                            {user:data[index].user, role:data[index].role}
                        )
                    })
                    let datajson = {"roles" : allRoles, "users" : users };
                    console.log(datajson);
                    res.status(200).send(datajson);
                    return;
                }
            })
            return;
        }else{
            res.status(500).send("you do not have access to get all roles");
        }
 
    } catch (error) {
        res.status(500).send("Could not get all Roles");
        
    }
   

})






// @route GET
// description This is checked on component did mount checks valid jwt to know logged state
router.get("/validjwt",jwt.validateLogin, (req, res)=>{
    let token = req.jwtPayload;
    console.log(token);
    res.status(200).send(token);
    
 })
