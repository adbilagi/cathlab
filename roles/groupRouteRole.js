/** 
 * This file containes preleges for route of groups creation edit and deleteing
 * 
*/

const role = require("./roles").role


let privilege =["/api/master/accounts/group/:group", "GET"];
role.createNewPrivileges(privilege, "This gets single group", false);
role.addPrivilegeToRole("admin", privilege,true);


privilege =["/api/master/accounts/group/all", "GET"];
role.createNewPrivileges(privilege, "This gets single group", false);
role.addPrivilegeToRole("admin", privilege,true);


privilege =["/api/master/accounts/group", "POST"];
role.createNewPrivileges(privilege, "This gets single group", false);
role.addPrivilegeToRole("admin", privilege,true);

privilege =["/api/master/accounts/group", "PUT"];
role.createNewPrivileges(privilege, "This gets single group", false);
role.addPrivilegeToRole("admin", privilege,true);

privilege =["/api/master/accounts/group", "DELETE"];
role.createNewPrivileges(privilege, "This gets single group", false);
role.addPrivilegeToRole("admin", privilege,true);


module.exports = role;