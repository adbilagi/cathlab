/**
 * This file contains route for ledeger creatation alter anddelte
 */

const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/ledger";
const jwt = require("../../middleware/usermiddleware");
const ledgerConn = require("../../model/schema").Ledger;
const Fawn = require("../../model/schema").Fawn;
const reqValidate = require("../../validate/ledgerValidate")



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
        // groupName :  req.body.groupName,
        groupKey : req.body.groupKey.trim(),
        email : req.body.email.trim(),
        phone : req.body.phone.trim(),
        panNumber : req.body.panNumber.trim(),
        gstNumber : req.body.gstNumber.trim(),
        address : req.body.address.trim(),
        openingBalance : req.body.openingBalance,
        activeLedger : req.body.openingBalance
       }

       ledgerConn.create(data).then((result)=>{

           res.status(200).json({
               data : result,
               message : `successfully created new ledger ${data.name} under group ${data.groupName}`
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
jwt.role.createNewPrivileges(privilege,"This gets all ledger", false)
jwt.role.addPrivilegeToRole("admin",privilege, true);
router.get("/", jwt.validateLogin, reqValidate, (req, res)=>{
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
    let getLedger = req.body.getLedger;
    let data={
        name :req.body.name.trim(),
        groupKey : req.body.groupKey.trim(),
        email : req.body.email.trim(),
        phone : req.body.phone.trim(),
        panNumber : req.body.panNumber.trim(),
        gstNumber : req.body.gstNumber.trim(),
        address : req.body.address.trim(),
        openingBalance : req.body.openingBalance,
        activeLedger : req.body.activeLedger
       }
       ledgerConn.updateOne({name : getLedger}, {$set : data}).then((data)=>{
           res.status(200).json({data : data, message : "successfully updated ledger"});
       }).catch((er)=>{
           res.status(500).send(er);
       })
})


