/**
 * this is entery file of backend server */

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const config = require("./config/config");
// const connString = config.mongoCon.local//for local database
const connString = config.mongoCon.remote// for remote connecton

// for running production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "client/build/index.html"));
    });
}



// mongoose connect
mongoose.connect(connString,  {useCreateIndex: true, useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("mongodb  connected")
    }
});


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
    console.log(`Listening at port ${PORT}....`);
});




