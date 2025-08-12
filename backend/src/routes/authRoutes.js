const express=require("express")
const { AuthCall } = require("../controller/authController")
module.exports=routes=express()
routes.post("/",AuthCall)
