const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");


 require("./users/login");

 const app = express();
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cors());
 app.listen(9000);

