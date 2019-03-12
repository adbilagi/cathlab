/**
 * This file validates the groupSchema
 */ 
const conGroup = require("../model/schema").Group;
const parentGroup =["Captil Account", "Assets", "Liabilities", "Profit and Loss"];

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
