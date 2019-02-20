/**
 * this is entery file of backend server */

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");


const config = require("./config/config");
mongoose.connect("mongodb://localhost/cathlab",  {useNewUrlParser: true});


const PORT = process.env.PORT || 3001;//set to env varibale


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    // CORS cross origin resource sharing needed as react runs on defferient port/server
    origin : "http:/localhost:3000",
    credentials : true
}));
app.use(cookieParser());

// users  routes 
const users = require("./routes/api/users");
app.use("/api/users", users);


app.listen(PORT, function(){
    console.log(`Liseting at port ${PORT}....`);
});




