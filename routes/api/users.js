/**
 * this file containes routs of users */

const express = require("express");
const router = express.Router();
const role = require("../../middleware/usermiddleware").role;
const fileUrl = "/api/users"
const validate = require("../../validate/userValidate")
const jwt = require("../../middleware/usermiddleware");
const userConn = require("../../model/schema").User// user schema
const ledgerConn = require("../../model/schema").Ledger;
const groupConn = require("../../model/schema").Group;

module.exports =router;
jwt.fileURL(fileUrl);
privilege=[];

 
// @route POST
// descrpiton This return jwt token with cookie on success login

router.post("/login", (req, res)=>{
    try {
        
        let user = req.body.user.trim();
        let password = req.body.password.trim();
        userConn.find({user : user, password : password, activeUser : true}, (err, data)=>{
            
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
privilege = [`${fileUrl}/signup`, "POST"];
jwt.role.createNewPrivileges(privilege, "To add new user", false);
jwt.role.addPrivilegeToRole("admin", privilege,true);
 router.post("/signup", jwt.validateLogin,  function(req, res){
    signUpUser(req, res);    
 });

 async function signUpUser(req, res){
    const session = await userConn.db.startSession();
    session.startTransaction();
     try {
            validate(req.body);
            let signData = {
                user : req.body.user.trim(),
                email : req.body.user.trim(),
                password : req.body.password.trim(),
                phone: req.body.phone.trim(),
            }

            const cashInHandGroupKey = await groupConn.findOne({name :"Cash in Hand"}).then(data=> data._id);
            await userConn.create(signData).then((data)=> data);
            const userCashLedger = {
                name : `${signData.user} cash`,
                email : req.body.email,
                phone : req.body.phone,
                openingBalance : 0,
                groupKey : cashInHandGroupKey,
                panNumber : req.body.panNumber,
                gstNumber : req.body.gstNumber,
                address : req.body.address
            }
            await ledgerConn.create(userCashLedger).then(data => data);
            session.commitTransaction();
            session.endSession();
            res.status(200).send("Successfully created new user");
     } catch (error) {
            await session.abortTransaction();
            session.endSession();
         res.status(500).send(error);
         
     }

 }

 //  @route PUT
// description This is changing password
privilege = [`${fileUrl}/changepassword`, "PUT"];
jwt.role.createNewPrivileges(privilege, "change password by user", true);
router.put("/changepassword", jwt.validateLogin, (req, res)=>{

try {
    
        validate(req.body);
        let oldPassword = req.body.oldPassword.trim();
        let newPassword = req.body.newPassword.trim();
        let curUser = req.jwtPayload.user.trim();
        userConn.updateOne({user : curUser, password : oldPassword}, {$set : {password : newPassword}}, (err, raw)=>{
        if(raw.n < 1){
            res.status(500).send("Did not change password");
            return;
        }else if(err){
            res.status(500).send("Did not change password");
            return;
        }else{
            res.status(200).json({message : "Successfully changed password"});
            return;
        }
        });

    
} catch (error) {
    res.status(500).send(error);
}

 });


/** 
 * =============================================
 * This section for roles
 * ================================================
*/



//  @route PUT
// descrption This is change role of user
privilege = [`${fileUrl}/changerole`, "PUT"];
jwt.role.createNewPrivileges(privilege, "change role", false);
jwt.role.addPrivilegeToRole("admin", privilege,true);
router.put("/changerole", jwt.validateLogin, (req, res)=>{
    
    try {
            validate(req.body);
            let curUser = req.body.user.trim();
            let curRole = req.body.role.trim();
            
            // here code for role change of user whoose role has to be changed , not the logged user
            userConn.updateOne({user : curUser}, {$set :{role : curRole}}, (err, raw)=>{
            // check valid user name
           
            if(raw.n < 1){
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

        
    } catch (error) {
        
        res.status(500).send(error)
        
    }

})


//  @route GET
// description :  this route gets all  roles and each users and his role
privilege =  [`${fileUrl}/getallusersandroles`, "GET"];
jwt.role.createNewPrivileges(privilege, "change role", false);
jwt.role.addPrivilegeToRole("admin", privilege, true);
router.get("/getallusersandroles", jwt.validateLogin,  (req, res)=>{
    // write code is not complete
    try {   
       const curRoles =role.getAllRoles();
        userConn.find((err, data)=>{
            if(err){
                res.status(500).send("Could not get user and roles")
                return;
            }else{
                let allRoles = role.getAllRoles();
                let users = data.map((user, index)=>{
                    return(
                        {user:data[index].user, role:data[index].role, activeUser : user.activeUser}
                    )
                })
                let datajson = {"roles" : allRoles, "users" : users };
                res.status(200).send(datajson);
                return;
            }
        });

 
    } catch (error) {
        res.status(500).send("Could not get all Roles");
        
    }
   

})


// @route PUT
// Description : this route resets the user activity to active inactive state
privilege = [`${fileUrl}/changeuseractivity`, "PUT"];
jwt.role.createNewPrivileges(privilege, "change user activity", false);
jwt.role.addPrivilegeToRole("admin", privilege,true);
router.put("/changeuseractivity", jwt.validateLogin,  (req, res)=>{
   
    try {
        validate(req.body);
        let changeUser = req.body.user.trim();
        let changeActiveUser = req.body.activeUser.trim();
        
        userConn.updateOne({user : changeUser},{$set : {activeUser : changeActiveUser}},(err, raw)=>{
            
            if(raw.n < 1){//number selected is less than 1 or zero then 500
                res.status(500).send("Invalid User");
                return;
            }else if(err){
                res.status(500).send("could not complete action due to error");
                return;
            }else{
                // res.status(200).send({"message" : "suucessfully reset the acivity of user"});
                res.status(200).json({message : "suucessfully reset the acivity of user"});
                return;
            }
        });
    } catch (error) {
        res.status(500).send(error);
        
    }
})


