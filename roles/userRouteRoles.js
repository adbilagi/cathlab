const role = require("./roles").role


let privilege =[];
// create roles


privilege = ["/api/users/signup", "POST"];
role.createNewPrivileges(privilege, "To add new user", false);
role.addPrivilegeToRole("admin", privilege,true);


privilege = ["/api/users/changepassword", "PUT"];
role.createNewPrivileges(privilege, "change password by user", true);

/**
 * ======================================
 * Roles
 * ====================================== 
 *  */

 // this route gets all  roles and each users and his role 
privilege =  ["/api/users/getallusersandroles", "GET"];
role.createNewPrivileges(privilege, "change role", false);
role.addPrivilegeToRole("admin", privilege,true);
role.addPrivilegeToRole("visitor",privilege, true);


privilege = ["/api/users/changerole", "PUT"];
role.createNewPrivileges(privilege, "change role", false);
role.addPrivilegeToRole("admin", privilege,true);
role.addPrivilegeToRole("visitor",privilege, true);


privilege = ["/api/users/changeuseractivity", "PUT"];
role.createNewPrivileges(privilege, "change user activity", false);
role.addPrivilegeToRole("admin", privilege,true);
role.addPrivilegeToRole("visitor",privilege, true);


module.exports = role;