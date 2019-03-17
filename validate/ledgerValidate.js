const isEmail = require("validator").isEmail
const crDrValidate = require("./index").crDrValidaate


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
    return new Promise((resolve, reject)=>{
        try {
           let retAmt =  crDrValidate(amt);
           resolve(retAmt)
            
        } catch (error) {
            reject(error);
            
        }
    })
}

let a = crDrValidate()


openingBalance("234.5d6cr").then(res=>console.log(res)).catch(err=>console.log(err));
