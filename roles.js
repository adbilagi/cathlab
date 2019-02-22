const role = require("user-groups-roles");

let privilege =[];
// create roles
role.createNewRole("admin");
role.createNewRole("doctor");
role.createNewRole("accountant");
role.createNewRole("receptionist");
role.createNewRole("visitor");

privilege = ["/api/user/signup", "POST"];
role.createNewPrivileges(["/api/user/signup", "POST"], "To add new user", false);
role.addPrivilegeToRole("admin", ["/api/user/signup", "POST"],true);
role.addPrivilegeToRole("visitor", ["/api/user/signup", "POST"],true);

privilege = ["/api/user/changepassword", "PUT"];
role.createNewPrivileges(privilege, "change password by user", true);


privilege = ["/api/user/changerole", "PUT"];
role.createNewPrivileges(privilege, "change role", false);
role.addPrivilegeToRole("admin", privilege,true);

module.exports = role;