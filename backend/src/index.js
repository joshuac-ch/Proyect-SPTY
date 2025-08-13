//const express=require('express')
import express from "express"
import dotenv from 'dotenv'
//const dotenv=require('dotenv')
import { conectionMongo } from "./lib/db.js"
//const {conectionMongo}=require("./lib/db")
dotenv.config()
const app=express()
const port=process.env.PORT
import { clerkMiddleware } from "@clerk/express"
import fileUpload from "express-fileupload"

//const useroutes=require("./routes/userRoutes")
import userRoutes from './routes/userRoutes.js'
//const adminroutes=require("./routes/adminRoutes")
import adminRoutes from './routes/adminRoutes.js'
//const authroutes=require("./routes/authRoutes")
import authRoutes from './routes/authRoutes.js'
//const songroutes=require("./routes/songRoutes")
import songRoutes from './routes/songRoutes.js'
import albumRoutes from './routes/albumRoutes.js'
//const albumroutes=require("./routes/albumRoutes")
import statsRoutes from './routes/statsRoutes.js'
//const statsroutes=require("./routes/statsRoutes")
//const path=require('path')
import path from 'path'
const __dirname=path.resolve()
app.use("/api/users/",userRoutes)
app.use("/api/admin/",adminRoutes)
app.use("/api/auth/",authRoutes)
app.use("/api/song/",songRoutes)
app.use("/api/album/",albumRoutes)
app.use("/api/stats/",statsRoutes)
app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV=="production"?"Error interno del servidor":err.message})
})
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"temp"),
    createParentPath:true,
    limits:{
        fileSize:10*1024*1024 //max 10mb
    }
}))
app.listen(port,()=>{
    console.log(`Corriendo en el puerto http://localhost:${port}`)
    conectionMongo()
})
//http://localhost:5000/api/admin/create-song