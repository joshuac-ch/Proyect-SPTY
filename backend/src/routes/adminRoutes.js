//const express=require('express')
//const { GetAdmin, createSong, deleteSong } = require('../controller/adminController')
//const { ProtectRute, requireAdmin } = require('../middleware/auth')
import {Router} from "express"
import { ProtectRute,requireAdmin } from '../middleware/auth.js'
import { CheckAdmin, GetAdmin,createAlbum,createSong,deleteAlbum,deleteSong } from '../controller/adminController.js'
const router=Router()
router.use(ProtectRute,requireAdmin)
router.get("/",GetAdmin)
router.get("/check",CheckAdmin)
router.post("/create-song",createSong)
router.delete("/delete/:id",deleteSong)
router.post("/c/album",createAlbum)
router.delete("d/album/:id",deleteAlbum)

export default router