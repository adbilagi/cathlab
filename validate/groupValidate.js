/**
 * This file validates the groupSchema
 */ 
const conGroup = require("../model/schema").Group;
const parentGroup =["Captil Account", "Assets", "Liabilities", "Profit and Loss", "Cash in Hand"];

module.exports =(curJson, callback)=>{
    for (const key in curJson) {
        switch (key) {
            case "underGroup":
            if(parentGroup.indexOf(curJson.underGroup >= 0)){
                callback();
            }else{
                conGroup.findOne({name : curJson.underGroup},
                    (err, data)=>{
                        if(err){
                            callback(err);
                        }else{
                            if(data == null){
                                callback("invalid Under group");
                            }else{
                                callback();
                            }
                        }
                    })

            }
             
                break;
        
            default:
                break;
        }
    }
   
}

module.exports.parentGroup = parentGroup;


let name = (name)=>{
    return new Promise((reslove, reject)=>{
        if(parentGroup.indexOf(name) >=0){
            reject(`${name} is reserved group you can not use`)
        }else{
            reslove(true);
        }

    })
}

let underGroup = (underGroup)=>{
    return new Promise((reslove, reject)=>{
        if(parentGroup.indexOf(underGroup) >= 0){
            reslove(true)
        }else{

            conGroup.findOne({name : curJson.underGroup},
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


module.exports = (req, res, next)=>{
    let curName = req.body.name;
    let curUnderGroup = req.body.underGroup

    Promise.all([name(curName), underGroup(curUnderGroup)])
    .then(()=>{
        next();
    }).catch((err)=>{
        res.status(500).send(err);
    })
}