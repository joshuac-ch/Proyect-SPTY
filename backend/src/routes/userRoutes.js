const express=require('express')
module.exports=routes=express()
routes.get("/",(req,res)=>{
    //req.auth.userId
    res.send("esta corriendo el servicio")
})
