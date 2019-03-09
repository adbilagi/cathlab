/**
 * This file validates the groupSchema
 */ 
const validator = require("validator");
const roles = require("../roles/roles");
const conGroup = require("../model/schema").Group;
const parentGroup =["Captil Account", "Assets", "Liabilities", "Profit and Loss"];


module.exports =(curJson)=>{
   for (const key in curJson) {
        switch (key) {
            case "name":

                // to write code
                break;
            case "underGroup":
            if(!(parentGroup.indexOf(curJson.underGroup) >=0)){
                conGroup.findOne({
                    name : curJson.underGroup
                 }, (err, data)=>{
                     if(err){
                         throw err;
                     }else{
                         if(data[0].underGroup !== curJson.underGroup){
                             throw "invalid Under group"
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
