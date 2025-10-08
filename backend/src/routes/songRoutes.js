//const express=require('express')
import {Router} from "express"
import { GetAllSongs, GetFeatureSongs, GetGenero, GetMadeForYou, GetTendingSongs } from "../controller/songController.js"
import { ProtectRute } from "../middleware/auth.js"
import { EditSong, ShowSong } from "../controller/adminController.js"
const router=Router()
router.get("/",(req,res)=>{
    res.send("Welcome to Songs ")
})
//router.use(ProtectRute)
router.get("/g/songs",GetAllSongs)
router.put("/u/:id",EditSong)
router.get("/g/features",GetFeatureSongs)
router.get("/g/made-for-you",GetMadeForYou)
router.get("/genero",GetGenero)
router.get("/g/tendings",GetTendingSongs)
router.get("/s/:id",ShowSong)
export default router
