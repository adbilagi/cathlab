/**
 * this is entery file of backend server */

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jwt-login");
const app = express();

const SECRET="GGHHFfgfahak123"//set to env variable
const PORT = process.env.PORT || 3001;//set to env varibale


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    // CORS cross origin resource sharing needed as react runs on defferient port/server
    origin : "http:/localhost:3000",
    credentials : true
}));


app.listen(PORT, function(){
    console.log(`Liseting at port ${PORT}....`);
});


// users  routes 
const users = require("./routes/api/users");
app.use("/api/users", users);
//  require("./users/login");

