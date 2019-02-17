const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jwt-login");
const app = express();


const SECRET="GGHHFfgfahak123"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin : "http:/localhost:3000",
    credentials : true
}));

// Login Route
app.post("/login", (req, res)=>{
    let user = req.body.user;
    let password = req.body.password;
    let login=0;
    try {
        if(user === password){
            jwt.sign(req, res, user, SECRET, 120);
         }else{
             throw "Invalid Login"
         }
        
    } catch (error) {
        res.status(500).send(error);
    }



})
// logout route
app.get("/logout", function(req, res){
    jwtLogin.signout(req, res, false);
});
 app.listen(9000);
//  require("./users/login");

