const express=require('express')
module.exports=router=express()
router.get("/",(req,res)=>{
    res.send("Welcome to Stats ")
})
