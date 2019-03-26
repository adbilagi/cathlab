const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/group";
const jwt = require("../../middleware/usermiddleware");
const groupConn = require("../../model/schema").Group;
const lederConn = require("../../model/schema").Ledger;


const parentGroup = require("../../config/config").ParentGroups;
const reservedGroup = require("../../config/config").ReservedGroups
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

        if(reservedGroup.indexOf(editGroup.oldName) >= 0){
            res.status(500).send(`not allowed to modify this reserved group ${editGroup.oldName} group`);
            return;
        }

        if(parentGroup.indexOf(editGroup.oldName) >= 0){
            res.status(500).send(`not allowed to modify this parent group ${editGroup.oldName} group`);
            return;
        }
        updateGroup(req, res, editGroup);


    } catch (error) {
        
    }
})

async function updateGroup(req, res, editGroup){
    const session = await groupConn.db.startSession();
    session.startTransaction();
    try {
        // update name group
        await groupConn.updateOne({name : editGroup.oldName}, {$set : {
            name : editGroup.name,
            underGroup : editGroup.underGroup
        }}).then(data =>data);

        // update all under groups with oldName
        await groupConn.updateMany({underGroup : editGroup.oldName}, {$set : {
            underGroup : editGroup.name
        }}).then(data => data)

        await session.commitTransaction();
        session.endSession()
        res.status(200).json({message : "upadated request"});
        ``
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send(error);

    }

}
 
// @route DELETE
// Description Deletes the group
jwt.role.createNewPrivileges([`${fileUrl}/`, "DELETE"], "This deletes single group", false);
jwt.role.addPrivilegeToRole("admin", [`${fileUrl}/`, "DELETE"], true);
router.delete("/", jwt.validateLogin,(req, res)=>{
    try {
        deleteGroup(req, res);
    } catch (error) {
        res.status(500).send(error);
    }
})

async function deleteGroup(req, res){
    let deleteGroupName =req.body.name.trim();
    // prvent parent group deletaton
    if(parentGroup.indexOf(deleteGroupName) >= 0){
        res.status(500).send(`not allowed to delete this parent ${deleteGroupName} group`);
        return;
    }
    // prvent reserved group deletaton
    if(reservedGroup.indexOf(deleteGroupName) >= 0){
        res.status(500).send(`not allowed to delete this reserved ${deleteGroupName} group`);
        return;
    }

    
    // check for valid group name
    const curGroupForID = await groupConn.findOne({name : deleteGroupName}).then(data =>data);
    if(curGroupForID === null){
        res.status(500).send(`invalid group name ${deleteGroupName}`);
        return
    }

    // check ledgers for use of deleteGroupName if so prevent deletation
    const findLedgerUse = await lederConn.findOne({groupKey : curGroupForID}).then(data => data)
    if(findLedgerUse !== null){
        res.status(500).send(`${deleteGroupName} can not be deleted as it is under by ledgers`);
        return;
    }
    errString = `can not delete ${deleteGroup.name} group, as it is under use`
    // check for deleteGroupName under use by anthoer group then prevent from deletation
    const findUnderGroup = await groupConn.findOne({underGroup : deleteGroupName}).then(data => data)
    if(findUnderGroup !== null){
        res.status(500).send(errString);
        return;
    }

    // delete the group atlast 
    const deletedGroup = await groupConn.deleteOne({name : deleteGroupName}).then(data =>data);
    res.status(200).json({data : deletedGroup , message : `deleted ${deleteGroupName}  group successfully`})

}