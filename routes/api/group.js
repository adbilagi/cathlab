const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/group";
const roleMiddleware = require("../../roles/roles").roleMiddleware(fileUrl);
const roles = require("../../roles/groupRouteRole");
const validate = require("../../validate/groupValidate");
const jwt = require("../../middleware/usermiddleware");
const groupConn = require("../../model/schema").Group;
const Fawn = require("../../model/schema").Fawn;
const parentGroup =["Captil Account", "Assets", "Liabilities", "Profit and Loss"];


module.exports = router;

router.get("/all", jwt.validateLogin, roleMiddleware,(req, res)=>{
    try {
        
        if(!req.permission){// check permisiion
            res.status(500).send("You do not have permission for this acction");
            return;
        }
        
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
router.get("/:group", (req, res)=>{
    
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
router.post("/", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){// check permisiion
            res.status(500).send("You do not have permission for this acction");
            return;
        }
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

router.put("/", jwt.validateLogin, roleMiddleware,(req, res)=>{
    try {
        if(!req.permission){// check permisiion
            res.status(500).send("You do not have permission for this acction");
            return;
        }
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
router.delete("/", (req, res)=>{
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
