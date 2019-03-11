/**
 * This file is main file for starting roles and also conatains roleMiddleware
 */
const role = require("user-groups-roles");
module.exports.roleMiddleware =(fileUrl)=>{
    return  (req, res, next)=>{
        // fileUrl is for shake app.routes in
        let CurUrl = `${fileUrl}${req.route.path}`;
        let curRole = req.jwtPayload.role;
        
        req.permission = role.getRoleRoutePrivilegeValue(curRole, CurUrl, req.method);

        next();
    }

}
// create roles
role.createNewRole("admin");
role.createNewRole("doctor");
role.createNewRole("accountant");
role.createNewRole("receptionist");
role.createNewRole("visitor");

module.exports.role = role;