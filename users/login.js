const express = require("express");
const jwtLogin = require("jwt-login");

const app = express();


app.post("/login",  function(req, res){
console.log("hjhjhj");
    
});

app.get("/logout", function(req, res){
    jwtLogin.signout(req, res, false);
});