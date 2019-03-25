/**
 * This file validates the groupSchema
 */ 
const conGroup = require("../model/schema").Group;
const parentGroup = require("../config/config").ParentGroups
const reservedGroup = require("../config/config").ReservedGroups

// validadation for name field in Groups collction
let name = (name)=>{
    return new Promise((reslove, reject)=>{
        if(parentGroup.indexOf(name) >=0 || reservedGroup.indexOf(name) >= 0 ){
            reject(`${name} is reserved or Parent group so you can not use`)
        }else{
            reslove(true);
        }

    })
}
// validadtion for underGroup field collection
let underGroup = (underGroup)=>{
    return new Promise((reslove, reject)=>{
        if(reservedGroup.indexOf(underGroup)>=0){
            reject(`${underGroup} is reserved group and can not be used`)
        }else if(parentGroup.indexOf(underGroup) >= 0){
            reslove(true)// can create group under parent group
        }else{
            conGroup.findOne({name : underGroup},
                (err, data)=>{
                    if(err){
                        reject(`invalid under group ${underGroup}`)
                    }else{
                        if(data == null){
                            reject(`invalid under group ${underGroup}`)
                        }else{
                           reslove(true)
                        }
                    }
                })

        }

    })
}

// middle ware for validadtion
reqValidate = (req, res, next)=>{
    let curName = req.body.name;
    let curUnderGroup = req.body.underGroup;
    

    Promise.all([name(curName), underGroup(curUnderGroup)])
    .then((data)=>{
       
        next();
    }).catch((err)=>{
        res.status(500).send(err);
    })
}

module.exports ={
    reqValidate
}