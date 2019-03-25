/**
 * This file contains route for ledeger creatation alter anddelte
 */

const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/ledger";
const jwt = require("../../middleware/usermiddleware");
const ledgerConn = require("../../model/schema").Ledger;
const groupConn = require("../../model/schema").groupConn;
const Fawn = require("../../model/schema").Fawn;
const reqValidate = require("../../validate/ledgerValidate")
const indexValidate = require("../../validate/index");


jwt.fileURL(fileUrl);
let privilege=[];

module.exports = router;


privilege = [`${fileUrl}/`, "POST"]
jwt.role.createNewPrivileges(privilege,"This creates new ledger", false)
jwt.role.addPrivilegeToRole("admin",privilege, true);
router.post("/", jwt.validateLogin, reqValidate, (req, res)=>{
    try {    
       let data={
        name :req.body.name.trim(),
        groupKey : req.body.groupKey.trim(),
        email : req.body.email.trim(),
        phone : req.body.phone.trim(),
        panNumber : req.body.panNumber.trim(),
        gstNumber : req.body.gstNumber.trim(),
        address : req.body.address.trim(),
        openingBalance : indexValidate.crDrValidaate(req.body.openingBalance),
        activeLedger : req.body.activeLedger
       }
       ledgerConn.create(data).then((result)=>{

           res.status(200).json({
               data : result,
               message : `successfully created new ledger ${data.name} under group ${req.body.groupName}`
           })
       }).catch(err => res.status(500).send(err));
    } catch (error) {
        res.status(500).send(error)
    }
    
})

privilege = [`${fileUrl}/:ledger`, "GET"]
jwt.role.createNewPrivileges(privilege,"This gets single ledger details", false)
jwt.role.addPrivilegeToRole("admin",privilege, true);
router.get("/:ledger", jwt.validateLogin, reqValidate, (req, res)=>{
    let curLedger = req.params.ledger.trim();
    
    ledgerConn.findOne({name : curLedger})
    .then((data)=> {
        if(data == null){
            res.status(500).send(`ledger ${curLedger} not found`)
        }else{
            res.status(200).json({data: data, message : `recived details of ${curLedger} successfully`})
        }
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})


privilege = [`${fileUrl}/`, "GET"]
jwt.role.createNewPrivileges(privilege,"This gets all ledgers except patients under Group", false)
jwt.role.addPrivilegeToRole("admin",privilege, true);
router.get("/", jwt.validateLogin, reqValidate, (req, res)=>{
    // {$ne : {underGroup : "Patients"}}
    ledgerConn.find().select("name")
    .then((data)=> {
        res.status(200).json({data : data});
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
})

privilege = [`${fileUrl}/`, "PUT"]
jwt.role.createNewPrivileges(privilege, "This edits ths ledgers", false);
jwt.role.addPrivilegeToRole("admin", privilege, true);
router.put("/", jwt.validateLogin, reqValidate, (req, res)=>{
    try {
        let getLedger = req.body.getLedger;
    let data={
        name :req.body.name.trim(),
        groupKey : req.body.groupKey.trim(),
        email : req.body.email.trim(),
        phone : req.body.phone.trim(),
        panNumber : req.body.panNumber.trim(),
        gstNumber : req.body.gstNumber.trim(),
        address : req.body.address.trim(),
        openingBalance : indexValidate.crDrValidaate(req.body.openingBalance),
        activeLedger : req.body.activeLedger
       }
       ledgerConn.updateOne({name : getLedger}, {$set : data}).then((data)=>{
           res.status(200).json({data : data, message : "successfully updated ledger"});
       }).catch((er)=>{
           res.status(500).send(er);
       })
    } catch (error) {
        res.status(500).send(error)
    }
    
})

privilege= [`${fileUrl}/`, "DELETE"];
jwt.role.createNewPrivileges(privilege, "This deletes the ledgers", false);
jwt.role.addPrivilegeToRole("admin", privilege, true);

router.delete("/", jwt.validateLogin, (req, res)=>{
    try {
        
    } catch (error) {
        
    }
})

async function deleteLedger(req, res){
    // get group  name
    let deleteLedger = req.body.name;
    const groupKey = await ledgerConn.findOne({name : deleteLedger}).then(data => data.groupKey);
    // get groupName 
    let groupName = await groupConn.findOne({_id : groupKey}).then(data => data.name);
    // check group name belongs to Patient or Cash in hand 
    if(groupName == "Patients" || groupName == "Cash in Hand"){
        res.status(500).send(`${groupName} is reserved group, ledger under this groups can not be deleted`);
        return;
    }
    

}


