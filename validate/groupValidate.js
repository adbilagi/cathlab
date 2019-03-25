/**
 * This file validates the groupSchema
 */ 
const conGroup = require("../model/schema").Group;
const parentGroup =["Captil Account", "Assets", "Liabilities", "Profit and Loss", "Cash in Hand", "Patients"];

// validadation for name field in Groups collction
let name = (name)=>{
    return new Promise((reslove, reject)=>{
        if(parentGroup.indexOf(name) >=0){
            reject(`${name} is reserved group you can not use`)
        }else{
            reslove(true);
        }

    })
}
// validadtion for underGroup field collection
let underGroup = (underGroup)=>{
    return new Promise((reslove, reject)=>{
        if(underGroup === "Cash in Hand"){
            reject(`Cash in Hand is reserved group and can not be used it as under group`)
        }else if(parentGroup.indexOf(underGroup) >= 0){
            reslove(true)
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
    reqValidate, parentGroup
}