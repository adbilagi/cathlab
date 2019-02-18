/**
 * this is entery file of backend server */

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jwt-login");
const app = express();



const testUsers = require("./model/test");//to be removed when connected to database

const SECRET="GGHHFfgfahak123"//set to env variable
const PORT = process.env.PORT || 3001;//set to env varibale


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    // CORS cross origin resource sharing needed as react runs on defferient port/server
    origin : "http:/localhost:3000",
    credentials : true
}));

// Login Route
app.post("/login", (req, res)=>{
    let user = req.body.user;
    let password = req.body.password;
    let login=false;

    try {
            //for testing purpose` 
        testUsers.users.forEach((curUser)=>{
            if(curUser.user === user && curUser.password === password){
                login=true;
            }
        })
        
        if(login){
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
    jwt.signout(req, res, false);
});


 app.post("/signin", function(req, res){
    try {
        // write code for user role status and permission
        let signData = {
            user : req.body.user,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            phone: req.body.phone
        }
        // write code for 
        res.status(200).send("OK");

        
    } catch (error) {
        req.status(500).send(error)
    }


 })


app.listen(PORT, function(){
    console.log(`Liseting at port ${PORT}....`);
});

app.post("/changepassword", (req, res)=>{
    // extract user name from req.jwt
    // only the same user can change password others can not change password

})

// users  routes 
const users = require("./routes/api/users");
app.use("/api/users", users);
//  require("./users/login");

