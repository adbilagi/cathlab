/**
 * This file validates the userSchema
 */ 
const validator = require("validator");
const roles = require("../middleware/usermiddleware").role;


module.exports = (curJson)=>{
    
    for (const key in curJson) {
        switch (key) {
            case "email":
                if(validator.isEmail(curJson.email) === false){
                    throw "Invalid Email"
                }
                break;
            case "joinedDate":
                if(validator.isAfter(curJson.joinedDate, "2000-01-01") === fasle){
                    throw "invalid Joined date, has to be after 2000-01-01";
                }
                break;
            case "dateOfBirth":
                if(validator.isAfter(curJson.dateOfBirth, "1900-01-01") === false){
                    throw "invalid  date of birth, has to be after 1900-01-01";
                }
                break;
            case "sex":
                if(curJson.sex !== "male" && curJson.sex !== "female"){
                    throw "invalis sex, sex has to be either male or female";
                }
                break;
            case "role":
                let allRoles = roles.getAllRoles();
                let foundRole = allRoles.indexOf(curJson.role);
                if(foundRole < 0){
                    throw "invalid role";
                }
        
            default:
                break;
        }
        
    }
}