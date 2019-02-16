const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jwt-login");
 const app = express();
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin : "http:/localhost:3000",
    credentials : true
}));

app.post("/login", (req, res)=>{
    let user = req.body.user;
    let password = req.body.password;
    let login=0;
    if(user === password){
       jwt.sign(req, res, user, "TPO", 1);
    }
    
    // res.send("L:L:L:L:Luiuiu").end();
    // res.status(200).json()
})
 app.listen(9000);
//  require("./users/login");

