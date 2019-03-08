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

router.post("/create", jwt.validateLogin, roleMiddleware, (req, res)=>{
    try {
        if(!req.permission){
            res.status(500).send("You do not have permission for this acction");
            return;
        }
        validate(req.body);

        conGroup.create({
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
} )