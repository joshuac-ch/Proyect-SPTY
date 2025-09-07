import { Song } from "../models/songModel.js"

export const GetAllSongs=async(req,res,next)=>{
    try{
        const modelo=await Song.find().sort({createdAt:-1})
        res.status(200).json({modelo})
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
//Se pueden usar algoritmos para que no sean aleatorios
export const GetFeatureSongs=async(req,res,next)=>{
try{
    const songs=await Song.aggregate([
        {
            $sample:{size:6}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageURL:1,
                audioURL:1
            }
        }
    ])
    res.json(songs)    
}catch(err){
    console.error(err.message)
    next(err)
}
}
export const GetMadeForYou=async(req,res,next)=>{
    try {
       const songs=await Song.aggregate([
        {
            $sample:{size:4}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageURL:1,
                audioURL:1
            }
        }
    ])
    res.json(songs)     
    } catch (error) {
        console.error(error.message)
        next(error)
    }
}
export const GetTendingSongs=async(req,res,next)=>{
    try{
         const songs=await Song.aggregate([
        {
            $sample:{size:4}
        },
        {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageURL:1,
                audioURL:1
            }
        }
    ])
    res.json(songs)
    }catch(err){
        console.error(err.message)
        next(err)
    }
}