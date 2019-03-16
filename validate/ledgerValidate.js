const Promise = require("promise")
const isEmail = require("validator").isEmail

let email = (email)=>{
    return new Promise((resolve, reject)=>{
        if(isEmail(email)=== false){
            
        }
    })
}

