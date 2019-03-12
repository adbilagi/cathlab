const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/group";
const validate = require("../../validate/groupValidate");
const jwt = require("../../middleware/usermiddleware");
const groupConn = require("../../model/schema").Group;
const Fawn = require("../../model/schema").Fawn;
const parentGroup =["Captil Account", "Assets", "Liabilities", "Profit and Loss"];


jwt.fileURL(fileUrl);
module.exports = router;


// Route GET
// Description This return all groups
jwt.role.createNewPrivileges([`${fileUrl}/all`, "GET"], "This gets all group", true);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/all`, "GET"], true);
router.get("/all", jwt.validateLogin, (req, res)=>{
    try {
        
        groupConn.find().select("name").then((data)=>{
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
router.post("/", jwt.validateLogin,  (req, res)=>{
    try {
        let newgroup ={
            name : req.body.name,
            underGroup : req.body.underGroup
        }
       
        validate(newgroup, (err)=>{
            if(err){
                res.status(500).send(err);
            }else{
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
            }
        })
        
    } catch (error) {
        res.status(500).send(error);
        
    }
} );

// @route PUT
// Description This route is for editing group
jwt.role.createNewPrivileges([`${fileUrl}/`, "PUT"], "This edits single and also itself at undergroup group", false);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/`, "PUT"], true);
router.put("/", jwt.validateLogin, (req, res)=>{
    try {
        let editGroup={
            oldName : req.body.oldName,
            name : req.body.name,
            underGroup : req.body.underGroup
        }
        
        validate(editGroup, (err)=>{
            if(err){
                res.status(500).send(err);
                return;
            }else{
                
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
      
            }
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
            name : req.body.name
        }
     
        let fountUnderGroup = false;
        groupConn.findOne({underGroup : deleteGroup.name})
        .then((data)=>{
            if(data.underGroup === deleteGroup.name){ 
                fountUnderGroup =true;
            }
        }).catch((err)=>{
            res.status(500).send(err);
            return;
        });

        if(fountUnderGroup){
            res.status(500).send(`can not delete ${deleteGroup.name} as it is under use`);
            return;
        }

        // ========================================
        groupConn.deleteOne({name : deleteGroup.name})
        .then((data)=>{
            if(data.deletedCount >0){
                res.status(200).json({
                    data : data,
                    message : `deleted the ${deleteGroup.name} group from database`
                });

            }else{
                res.status(500).send(`Could not delete ${deleteGroup.name} group from database`)
            }
            
            return;
        }).catch((err)=>{
            res.status(500).send(err);
            return;
        })

    
        
    } catch (error) {
        res.status(500).send(error);
        
    }
})
