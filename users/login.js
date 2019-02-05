const app = require("jwt-http");
const path =require("path");

app.renderHTML("/login", path.join(__dirname, "../html/login.html"),true);
