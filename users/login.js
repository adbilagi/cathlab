const app = require("jwt-http");
const path =require("path");
const queryString = require("querystring");

app.renderHTML("/log", path.join(__dirname, "log.html"));
app.postMethod("/test",true, (req, res)=>{
    console.log(req.body);
})


var loginMiddleWareMethod = function(req, res, next){
    var data = queryString.parse(req.body);
    var user = data.user;
    var password = data.password;
    var login=0 // processs the code from database and using user and password set to true if succusful
    if(user == password){
        login =1;
    }
    if(login){
        next(req, res, next);
    }else{
        app.httpMsgs.send500(req, res, "invalid user and password", false);
        return false
    }

}

app.setLoginRoute(loginMiddleWareMethod,"topsecret", 1); //second arg is secrete key and third arg is expire of token in minites
app.setlogout();//this sets get method logout route setting jwt token = "" and route is `/logout`



