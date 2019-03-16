// const Promise = require("promise")
const isEmail = require("validator").isEmail

let email = (email)=>{
    return new Promise((resolve, reject)=>{
        if(isEmail(email)==false){
            reject("invalid email");
        }else{
            resolve(true)
        }
    })

}

email("umesh@gmailcom").then((data)=>{
    console.log(data);
}).catch((er)=>{
    console.log(er);
})

