const app = require("jwt-http");


// create roles
app.roles.createNewRole("admin");
app.roles.createNewRole("doctor");
app.roles.createNewRole("accounts");


