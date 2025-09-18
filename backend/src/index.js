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
import cors from "cors"
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
import { createServer } from "http"
import { InitialSocket } from "./lib/socket.js"
const __dirname=path.resolve()
const httpserver=createServer(app)
InitialSocket(httpserver)

app.use(cors({
    origin:[`http://${process.env.HOST}:5173`,`http://${process.env.HOST}:4173`,`http://${process.env.HOST}:5173`],
    credentials:true
}))

//ponerlo aqui antes de todas mis rutas
app.use(clerkMiddleware({
     publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// 👇 Aquí va fileUpload ANTES de las rutas
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"temp"),
    createParentPath:true,
    limits:{
        fileSize:10*1024*1024 //max 10mb
    }
}))


app.use("/api/users/",userRoutes)
app.use("/api/admin/",adminRoutes)
app.use("/api/auth/",authRoutes)
app.use("/api/song/",songRoutes)
app.use("/api/album/",albumRoutes)
app.use("/api/stats/",statsRoutes)
app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV=="production"?"Error interno del servidor":err.message})
})


httpserver.listen(port,()=>{
    console.log(`Corriendo en el puerto http://${process.env.HOST}:${port}`)
    conectionMongo()
})
//http://localhost:5000/api/admin/create-song