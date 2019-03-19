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
        name :req.body.name,
        // groupName :  req.body.groupName,
        groupKey : req.body.groupKey,
        email : req.body.email,
        phone : req.body.phone,
        panNumber : req.body.panNumber,
        gstNumber : req.body.gstNumber,
        address : req.body.address,
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

