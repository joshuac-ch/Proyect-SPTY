
import { Album } from "../models/albumModel.js"
import { Song } from "../models/songModel.js"
import cloudnary from "../lib/cloudnary.js"

export const GetAdmin=(req,res)=>{
    res.send("Welcome to Admin ")
}
export const uploadToCloudnary=async(file)=>{
    try{
        const resul=await cloudnary.uploader.upload(file.tempFilePath,{
            resource_type:"auto"
        })
        return resul.secure_url
    }catch(err){
        throw new Error(err.message)        
    }
}
export const createSong=async(req,res,next)=>{
    try{
        if(!req.files|| !req.files.audioFile||!res.files.imageFile){
            return res.status(404).json({message:"POR FAVOR SUBIR UN FORMATO"})
        }
       
        const {title,artist,albumID,duration}=req.body
        const {audioURL}=req.files.audioFile
        const {imageURL}=req.files.imageURL //revisar esto
         const audioFile=await uploadToCloudnary(audioFile)
        const imageFile=await uploadToCloudnary(audioFile)
        const song=new Song({
            title,
            artist,
            albumID:albumID||null,
            duration,
            audioURL,
            imageURL
        })
        await song.save()
        if(albumID){
            await Album.findByIdUpdate(albumID,{
                $push:{
                    songs:song._id
                }
            })
        }
        res.status(200).json({messaga:"se creo la cancion"})
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const deleteSong=async(req,res,next)=>{
    try{    
        const {id}=req.params
        const song=await Song.findById(id)
        if(song.albumID){
            await Album.findByIdAndUpdate(song.albumID,{
                $pull:{songs:song.id}
            })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message:"Se elimino la cancion"})
         
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const createAlbum=async(req,res,next)=>{
    try{
        const {title,artist,releaseYear,songs}=req.body
        const {imageFile}=req.files//asi debe ser imageFile o pude ser otro nombre probar
        const imageURL=await uploadToCloudnary(imageFile)
        const album=new Album({
            title,
            artist,
            releaseYear,
            imageURL
        })
        await album.save()
        res.status(200).json(album)
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const deleteAlbum=async(req,res,next)=>{
    try{
       const {id}=req.params
        await Song.deleteMany({albumID:id})
        await Album.findByIdAndDelete(id)
        res.status(200).json({message:"Se elimino el album"})
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const CheckAdmin=async(req,res,next)=>{    
        res.status(200).json({admin:true})    
}