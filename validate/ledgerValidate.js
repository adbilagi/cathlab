const isEmail = require("validator").isEmail
const crDrValidate = require("./index").crDrValidaate
const assert = require("assert")


let email = (email="")=>{
    return new Promise((resolve , reject)=>{
        if(isEmail(email)=== true  || email === ""){
            resolve(email);
        }else{
            reject("invalid email")
        }
    });

}



let openigBalance= (amt="")=>{
    return new Promise((resolve, reject)=>{
        try {
            if(amt==""){
                resolve(0);
            }
            let curAmt = crDrValidate(amt);
            resolve(curAmt);
        } catch (error) {
            reject(error);
            
        }
    })
}


module.exports = (req, res, next)=>{
    let curEmail = req.body.email;
    let curOpeningBalance = req.body.openigBalance;

    Promise.all([email(curEmail), openigBalance(curOpeningBalance)])
    .then((data)=>{
        req.validateData=data;
        next();
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
}
