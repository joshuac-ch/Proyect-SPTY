import { Album } from "../models/albumModel.js"

export const GetAlbumAll=async(req,res,next)=>{
    try {
        const album=await Album.find()
        res.status(200).json(album)
    } catch (error) {
        console.error(error.message)
        next(error)            
    }
}
export const GetAlbumID=async(req,res,next)=>{
    try{
        const {id}=req.params
        const album=await Album.findById(id).populate("songs")
        if(!album){
            return res.status(404).json({message:"No se encontro ese album"})
        }
        res.status(200).json(album)
    }catch(err){
        console.error(err.message)
        next(err)
    }
}