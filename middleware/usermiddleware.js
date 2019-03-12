/**
 * This file containes middle ware for users and role
 *   */
const role = require("user-groups-roles");
const jwt = require("jsonwebtoken");
const SECRETKEY = "Umesh"
let fileUrl=""


let fileURL = (fileURL)=>{
    fileUrl = fileURL;
}
let validateLogin =(req, res, next)=>{
    try {
        let token = req.cookies.JWToken;
      
        let payload =jwt.verify(token, SECRETKEY);
        req.jwtPayload = payload;
        createJWTToken(payload.user, payload.role, req, res);
        // for roles
        let CurUrl = `${fileUrl}${req.route.path}`;
        let curRole = req.jwtPayload.role;
        req.permission = role.getRoleRoutePrivilegeValue(curRole, CurUrl, req.method);
        if(req.permission === false){
            res.status(500).send("You do not have permission for this acction");
        }else{
            
            next();
        }
        
        
    } catch (error) {
        res.status(500).send("invalid access ")
    }
 
}

role.createNewRole("admin");
role.createNewRole("doctor");
role.createNewRole("accountant");
role.createNewRole("receptionist");
role.createNewRole("visitor");


module.exports.validateLogin =validateLogin
module.exports.role = role;
module.exports.fileURL = fileURL;



//=====================================================
// @this fun create new token from user and role
// this cod is here becase of SECRETKEY
let createJWTToken = (user, role, req, res)=>{
    let token = jwt.sign({"user": user, "role" : role}, SECRETKEY);
    res.cookie("JWToken", token, {maxAge: 50*60*1000, httpOnly : true});
}

module.exports.createJWTToken = createJWTToken;
