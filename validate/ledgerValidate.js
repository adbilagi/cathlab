const isEmail = require("validator").isEmail
const crDrValidate = require("./index").crDrValidaate
const assert = require("assert")


let email = (email)=>{
    return new Promise((resolve, reject)=>{
        if(isEmail(email)==false){
            reject("invalid email");
        }else{
            resolve(true)
        }
    })

}
let openingBalance = (amt)=>{
   assert.ifError(crDrValidate(amt))

}



openingBalance("234cr");



