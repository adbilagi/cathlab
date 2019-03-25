const isEmail = require("validator").isEmail
const crDrValidate = require("./index").crDrValidaate
const groupConn = require("../model/schema").Group;
const parentGroup = require("./groupValidate").parentGroup




let email = (email="")=>{
    
    return new Promise((resolve , reject)=>{
        if(isEmail(email)=== true  || email === ""){
            resolve(email);
        }else{
            reject("invalid email")
        }
    });

}

let groupName = (groupName)=>{
    return new Promise ((resolve, reject)=>{
        if(parentGroup.indexOf(groupName) >= 0){
            reject(`${groupName} is reserved group can not be used`)
        }else{
            resolve(true)
        }
    })
}


let groupKey = (key)=>{
    return new Promise((resolve, reject)=>{
        let preventedGroups=[{name : "Cash in Hand"}, {name : "Patients"}];
        groupConn.findOne({$or : preventedGroups}, (err, data)=>{
            if(err){
                reject(err)
            }else if(key === data._id){
                reject("Cash in Hand and Patients are reserved group not allowd create ledgers under this group")
            }else{
                resolve(true)
            }
        })


    })
}


let openingBalance= (amt="")=>{
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
    let curEmail = req.body.email.trim();
    let curOpeningBalance = req.body.openigBalance;
    let curGroupName = req.body.groupName.trim();
    let curGroupKey = req.body.groupKey;

    Promise.all([email(curEmail), groupKey(curGroupKey), groupName(curGroupName) ,openingBalance(curOpeningBalance)])
    .then((data)=>{
        req.validateData=data;
        next();
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
}
