//const express=require('express')
import {Router} from "express"
import { GetAllSongs, GetFeatureSongs, GetMadeForYou, GetTendingSongs } from "../controller/songController.js"
import { ProtectRute } from "../middleware/auth.js"
const router=Router()
router.get("/",(req,res)=>{
    res.send("Welcome to Songs ")
})
router.use(ProtectRute)
router.get("/g/songs",GetAllSongs)
router.get("/g/songs/feature",GetFeatureSongs)
router.get("/g/songs/made-for-you",GetMadeForYou)
router.get("/g/songs/tending",GetTendingSongs)
export default router
