const express=require('express')
module.exports=routes=express()
routes.get("/",(req,res)=>{
    res.send("Welcome to Album ")
})
