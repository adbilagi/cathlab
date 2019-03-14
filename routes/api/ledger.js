/**
 * This file contains route for ledeger creatation alter anddelte
 */

const express = require("express");
const router = express.Router();
const fileUrl = "/api/master/accounts/ledger";
const validate = require("../../validate/groupValidate");
const jwt = require("../../middleware/usermiddleware");
const groupConn = require("../../model/schema").Group;
const Fawn = require("../../model/schema").Fawn;


jwt.fileURL(fileUrl);
let privilege=[];

module.exports = router;

privilege = [`${fileUrl}/`, "POST"]
jwt.role.createNewPrivileges(privilege,"This creates new ledger", false)
jwt.role.addPrivilegeToRole("admin",privilege, true);
router.post("/", jwt.validateLogin, (req, res)=>{
    
})

