const express=require('express')
const { GetAdmin, createSong } = require('../controller/adminController')
const { ProtectRute, requireAdmin } = require('../middleware/auth')

module.exports=routes=express()
routes.get("/",GetAdmin)
routes.post("/create-song",ProtectRute,requireAdmin,createSong)