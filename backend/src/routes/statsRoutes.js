//const express=require('express')
import {Router} from "express"
import { Song } from "../models/songModel.js"
import { User } from "../models/userModel.js"
import { Album } from "../models/albumModel.js"
const router=Router()
router.get("/",async(req,res,next)=>{
   try{
    
    const [totalAlbums,totalSonsg,totalUsers,uniqueArtist]=await Promise.all([
       Album.countDocuments(),
       Song.countDocuments(),
       User.countDocuments(),
       Song.aggregate([
        {
            $unionWith:{
                coll:"albums",
                pipeline:[]
            }
        },
        {
            $group:{
                _id:"$artist"
            }
        },
        {
            $count:"count"
        }
       ])
    ])
    res.status(200).json({totalAlbums,totalSonsg,totalUsers,totalArtist:uniqueArtist[0]?.count||0})
   }catch(err){
    console.error(err.message)
    next(err)
   }
})
export default router
