/** 
 * This file containes scheme of users to mongo db
 * */ 
const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    joinedDate : {
        type : Date,
        required : true,
        default : Date.now
    },
    fullName : {
        /** 
         * @fullName Full name of person
         * @description This field is storign full name of user
        */
     
        type : String,
        required : false
    },
    activeUser : {/** 
        @active user
        @description This is field is for retiring user by setting false so further transaction of user
        true means active and false means not active user
        */
        type : Boolean,
        required : true,
        default : true
    },
    dateOfBirth : {
        type : Date,
        required : false
    },
    sex : {
        type : String,
        required : false
    },
    role : {
        /**
         * @role 
         * @options admin, doctor, accountant, receptioniest, vistor
         *  */
        type : String,
        required : true,
        default : "visitor"// visitor no access for any valid route
    }
})

let User = mongoose.model("User", userSchema);

module.exports.getUsers= (callback, limit)=>{
    User.find(callback).limit(limit);
}

module.exports.getUserByName = (user, callback)=>{
    User.find(user, callback);
}
module.exports.insertUser=(data, callback)=>{
    try {
        User.create(data, callback);
    } catch (error) {
        return error;
    }
    
}

module.exports.updateUser=(user, data, callback)=>{
    User.findOneAndUpdate(user,data, callback);
}

module.exports.deleteUser = (user, callback)=>{
    User.findOneAndRemove(user, callback);
}