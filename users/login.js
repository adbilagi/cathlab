const express = require("express");
const jwtLogin = require("jwt-login");

const app = express();


app.post("/login",  function(req, res){
    var user = req.body.user
    var password = req.body.password
    if (user == password){
        jwtLogin.sign(req, res, user,"topsecret", 1,false);  
    }else{
        httpMsgs.send500(req, res, "invalid user");
    }
    
});

app.get("/logout", function(req, res){
    jwtLogin.signout(req, res, false);
});