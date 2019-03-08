/**
 * this file containes routes for creating new groups name, edit groups name and delete groups for account masters */

const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/group"
const roleMiddleware = require("../../roles/roles").roleMiddleware(fileUrl);
const jwt = require("../../middleware/usermiddleware");
const conGroup = require("../../model/schema").Group
const validate = require("../../validate/groupValidate");

module.exports =router;


// @route POST
// Description : creating new group name
router.post("/", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){// check permisiion
            res.status(500).send("You do not have permission for this acction");
            return;
        }
        validate(req.body);// validate post data

        conGroup.create({// create new doc in mongodb
            name : req.body.name,
            underGroup : req.body.underGroup
        }, (err, data)=>{
            if(err){
                res.status(500).send("Could not creat new group");
                return;
            }else{
                res.status(200).json({
                    data : data, message : "successfully created new group"
                });
                return;
            }
        })
        
    } catch (error) {
        res.status(500).send(error);
        
    }
} );

// @route GET
// Descrption This is for getting specified group
router.get("/:group", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){
            res.status(500).send("you do not have permission for this action");
            return;
        }
        let groupName = req.body.params.group;
        
        conGroup.find({
            name : groupName
        },(err, data)=>{
            if(err){
                res.status(500).send(err);
                return
            }else{
                res.status(200).json({data : data, message : "Kindly check the recived group name"});
                return
            }
        })
        
    } catch (error) {
        res.status(500).send(error);
    }

});

// @route PUT
// description  alters the group
router.put("/", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){
            res.status(500).send("you do not have permission for this action");
            return;
        }
        validate(req.body);
        conGroup.updateOne({name : req.body.oldName}, 
            {name : req.body.name, underGroup : req.body.underGroup},
            (err, raw)=>{
                if(raw.n <1){
                    res.status(500).send("Could not modify any record");
                    return;
                }else if(err){
                    res.status(500).send(err);
                    return;
                }else{
                    res.status(200).json({data : raw, message : "Succefully  edited group"});
                    return;
                }
            })
        
    } catch (error) {
        res.status(500).send(error);
    }

});

// @route DELETE
// Descrpition : This route is meant for delete groups 
router.delete("/:group", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){
            res.status(500).send("you do not have permission for this action");
            return;
        }
        let groupName = req.body.params.group;
        // write code to check for checking under group  and ledger existance before deleting if so one can delete group
        conGroup.find({// check under group before deleting
            underGroup : groupName
        }, (err, data)=>{
            if(err){
                res.status(500).send(err);
            }else{
                if(data[0].underGroup == groupName){
                    res.status(500).send("This group can not be deleted as it has sub group under")
                }
            }
        })

        conGroup.deleteOne({
            name : groupName
        }, (err)=>{
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).json({message : "succusfully delted this groups"});
                return;
            }
        })
        
    } catch (error) {
        res.status(500).send(error);
        
    }
});


// @route GET
// Description : get all group name
router.get("/all", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){// check permisiion
            res.status(500).send("You do not have permission for this acction");
            return;
        }
        conGroup.find((err,data)=>{
            if(err){
                res.status(500).send(err);
                return;
            }else{
                res.status(200).json({
                    data : data, message : "kindly check the data recived"
                })
            }
        })
        
    } catch (error) {

        res.status(500).send(error);
        
    }
});