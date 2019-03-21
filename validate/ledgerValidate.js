const isEmail = require("validator").isEmail
const crDrValidate = require("./index").crDrValidaate
const groupConn = require("../model/schema").Group;




let email = (email="")=>{
    
    return new Promise((resolve , reject)=>{
        if(isEmail(email)=== true  || email === ""){
            resolve(email);
        }else{
            reject("invalid email")
        }
    });

}


let groupKey = (key)=>{
    return new Promise((resolve, reject)=>{
        groupConn.findOne({name : "Cash in Hand"}, (err, data)=>{
            if(err){
                reject(err)
            }else if(key === data._id){
                reject("cash in hand is reserved group not allowd create ledgers under this group")
            }else{
                resolve(true)
            }
        })


    })
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
    let curGroupKey = req.body.groupKey;

    Promise.all([email(curEmail), groupKey(curGroupKey) ,openigBalance(curOpeningBalance)])
    .then((data)=>{
        req.validateData=data;
        next();
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
}
