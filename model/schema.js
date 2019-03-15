/** 
 * This file containes scheme of users to mongo db
 * */ 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Fawn = require("fawn");
Fawn.init(mongoose);


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
});

let groupSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    underGroup: {
        type: String,
        required : true
    }
});

let ledgerSchema = new mongoose.Schema({
    
    name :{
        type : String,
        required : true,
        unique : true
    },
    groupName :  {
        type :[{ type: Schema.Types.ObjectId, ref: 'Group' }],
        required : true

    },
    email : {
        type : String,
        required : false,
        unique : false,

    },
    phone : {
        type : String,
        required : false,
        unique : false
    },
    panNumber : {
        type : String,
        required : false,
        unique : false
    },
    gstNumber : {
        type : String,
        required : false,
        unique : false
    },
    address : {
        type : String,
        required : false,
        unique : false
    },
    openingBalance : {
        type : Number,
        required : false,
        unique : false,
        default : 0
    },
    activeLedger : {
        type : Boolean,
        required : true,
        default : true
    }
       
});

 const Group = mongoose.model("Group", groupSchema);
 const Ledger = mongoose.model("Ledger", ledgerSchema)
 const User = mongoose.model("User", userSchema);
 
 module.exports.Fawn = Fawn;
 module.exports.User = User;
 module.exports.Ledger = Ledger;
 module.exports.Group = Group;
