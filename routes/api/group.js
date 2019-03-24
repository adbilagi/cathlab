const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/group";
const jwt = require("../../middleware/usermiddleware");
const groupConn = require("../../model/schema").Group;
const lederConn = require("../../model/schema").Ledger;
const Fawn = require("../../model/schema").Fawn;

const parentGroup = require("../../validate/groupValidate").parentGroup;
const reqValidate = require("../../validate/groupValidate").reqValidate;




jwt.fileURL(fileUrl);
module.exports = router;


// Route GET
// Description This return all groups
jwt.role.createNewPrivileges([`${fileUrl}/all`, "GET"], "This gets all group", true);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/all`, "GET"], true);
router.get("/all", jwt.validateLogin, (req, res)=>{
    try {
        groupConn.find().then((data)=>{
            res.status(200).send({data : data, parentGroup : parentGroup});
            return;
        }).catch(err=>{
            res.status(500).send(err);
        })
        
    } catch (error) {

        res.status(500).send(error);
        
    }
});

// @route GET
// Description : This route is for getting single group
jwt.role.createNewPrivileges([`${fileUrl}/:group`, "GET"], "This gets single group", false);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/:group`, "GET"], true);
router.get("/:group", jwt.validateLogin,(req, res)=>{
    
    try {
        let curGroup = req.params.group;
        curGroup = curGroup.trim();
        groupConn.findOne({name : curGroup}).then((data)=>{
            res.status(200).json({
                data : data,
                message : "sent a group"
            })
            return;
        }).catch((err)=>{
            res.status(500).send(err);
            return;
        })
        
    } catch (error) {
        return;
    }
})

// @route POST
// Description : creating new group name
jwt.role.createNewPrivileges([`${fileUrl}/`, "POST"], "This creates new group", false);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/`, "POST"], true);
router.post("/", jwt.validateLogin,reqValidate,  (req, res)=>{
    try {
        let newgroup ={
            name : req.body.name.trim(),
            underGroup : req.body.underGroup.trim()
        }
        groupConn.create(newgroup).then(data=>{
            res.status(200).json({
                data : data,
                message : `succefully created new group ${newgroup.name} under ${newgroup.underGroup}`
            });
            return;
        }).catch((err)=>{
            res.status(500).send(`Could not create new group`);
            return;
        })

        
    } catch (error) {
        res.status(500).send(error);
        
    }
} );

// @route PUT
// Description This route is for editing group
jwt.role.createNewPrivileges([`${fileUrl}/`, "PUT"], "This edits single and also itself at undergroup group", false);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/`, "PUT"], true);
router.put("/", jwt.validateLogin,reqValidate, (req, res)=>{
    try {
        let editGroup={
            oldName : req.body.oldName.trim(),
            name : req.body.name.trim(),
            underGroup : req.body.underGroup.trim()
        }
        if(parentGroup.indexOf(editGroup.oldName) >= 0){
            res.status(500).send(`not allowed to modify this reserved ${editGroup.oldName} group`);
            return;
        }
        // use trasaction instead of Fawn this code has to written 
        Fawn.Task().update("groups", {name : editGroup.oldName}, {$set : {
            name : editGroup.name,
            underGroup : editGroup.underGroup
        }})
        .update("groups", {underGroup : editGroup.oldName}, {$set : {
            underGroup : editGroup.name
        }}).options({multi : true})
        .run()
        .then((data)=>{
            res.status(200).json({data :data, message : "upadated request"});
            return;
        })
        .catch((error)=>{
            res.status(500).send(error);
            return;
        })

    } catch (error) {
        
    }
})
 
// @route DELETE
// Description Deletes the group
jwt.role.createNewPrivileges([`${fileUrl}/`, "DELETE"], "This deletes single group", false);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/`, "DELETE"], true);
router.delete("/", jwt.validateLogin,(req, res)=>{
    try {
        let deleteGroup ={
            name : req.body.name.trim()
        }

        if(parentGroup.indexOf(deleteGroup.name) >= 0){
            res.status(500).send(`not allowed to delete this reserved ${deleteGroup.name} group`);
            return;
        }
       
        errString = `can not delete ${deleteGroup.name} group, as it is under use`
        groupConn.findOne({underGroup : deleteGroup.name}, (ferr, fData)=>{
            if(ferr){
                res.status(500).send(errString);
                return;
            }else if(fData !== null){
                
                res.status(500).send(errString);
                return;
            }else{             
                
                groupConn.findOne({name : deleteGroup.name}, (ferr, fData)=>{
                    
                    if(ferr){
                        res.status(500).send(errString);
                        return;
                    }else if(fData === null){
                        res.status(500).send(errString);
                        return;
                    }else{
                        
                        
                        // get id f of group to check inside ledger collection
                        let curId = fData._id
                       
                        lederConn.findOne({groupKey: [curId]}, (ferr, fData)=>{
                            if(ferr){
                                res.status(500).send(errString);
                                return;
                            }else if( fData === null){
                                // if ledger collection does not have same id then delete the group
                                    groupConn.deleteOne({name : deleteGroup.name},(err, data)=>{
                                        if(err){
                                            res.status(500).send(err);
                                            return;
                                        }else if(data.deleteCount < 1){
                                            res.status(500).send(errString);
                                            return;
                                        }else {
                                            res.status(200).json({data : data, message :`deleted ${deleteGroup.name}  group successfully`})
                                        }
                                        
                                    })
                                    return;

                            }else{
                                // if ledger collection has id used then can not delete group
                                res.status(500).send(`can not delete ${deleteGroup.name} group, as it is under use by a ledger`);
                                return;
                            }
                        })


                    }
                })



            }
        });
    } catch (error) {
        res.status(500).send(error);
        
    }
})
