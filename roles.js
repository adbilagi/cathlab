const role = require("user-groups-roles");

let privilege =[];
// create roles
role.createNewRole("admin");
role.createNewRole("doctor");
role.createNewRole("accountant");
role.createNewRole("receptionist");
role.createNewRole("visitor");

privilege = ["/api/users/signup", "POST"];
role.createNewPrivileges(privilege, "To add new user", false);
role.addPrivilegeToRole("admin", privilege,true);
role.addPrivilegeToRole("visitor", privilege,false);

privilege = ["/api/users/changepassword", "PUT"];
role.createNewPrivileges(privilege, "change password by user", true);


privilege = ["/api/users/changerole", "PUT"];
role.createNewPrivileges(privilege, "change role", false);
role.addPrivilegeToRole("admin", privilege,true);

module.exports = role;