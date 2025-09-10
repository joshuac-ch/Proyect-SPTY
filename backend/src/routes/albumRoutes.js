//const express=require('express')
import {Router} from "express"
import { GetAlbumAll, GetAlbumID } from "../controller/albumController.js"

const router=Router()

router.get("/",(req,res)=>{
    res.send("Welcome to Album ")
})
router.get("/g",GetAlbumAll)
router.get("/g/:id",GetAlbumID)

export default router
