
import { Album } from "../models/albumModel.js"
import { Song } from "../models/songModel.js"
import cloudnary from "../lib/cloudnary.js"
import { Reproducciones } from "../models/reproduccionesModel.js"

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
export const ShowSong=async(req,res,next)=>{
    try{
        const {id}=req.params
        const cancion=await Song.findById(id)
        if(!cancion){
            return res.status(404).json({message:"No se encontro la cancion"})
        }
        res.status(200).json(cancion)
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const CreateSong=async(req,res,next)=>{
    try{
        
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "POR FAVOR SUBIR UN FORMATO" });
        }       
        const {title,artist,albumID,duration,plays,genero,releaseYear,tags,mood}=req.body
        const audioFile=req.files.audioFile
        const imageFile=req.files.imageFile 
        const audioURL=await uploadToCloudnary(audioFile)
        const imageURL=await uploadToCloudnary(imageFile)
        const song=new Song({
            title,
            artist,
            albumID:albumID||null,
            duration,
            audioURL,
            imageURL,
            plays,
            genero,
            releaseYear,
            tags,
            mood,

        })
        await song.save()
        if(albumID){
            await Album.findByIdAndUpdate(albumID,{
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
export const EditSong=async(req,res,next)=>{
    try{
        const {id}=req.params
        const {title,artist,albumID,duration,plays,genero,releaseYear,tags,mood}=req.body
        const song = await Song.findById(id)
        if (!song) return res.status(404).json("Canción no encontrada")
        const audioFile=req.files?.audioFile
        const imageFile=req.files?.imageFile
        if(!title||!artist||!genero||!releaseYear||!tags||!mood ){
            return res.status(404).json("No se llenaron los datos")
        }
        const audioURL = audioFile ? await uploadToCloudnary(audioFile) : song.audioURL;
        const imageURL = imageFile ? await uploadToCloudnary(imageFile) : song.imageURL;

        const form={
           title,artist,albumID,duration,plays,genero,releaseYear,tags,mood,audioURL,imageURL
        }
        
        const updateSong=await Song.findByIdAndUpdate(id,form,{
            new:true,
            runValidators:true
        })
        // 2️⃣ Si cambió el álbum, actualiza la relación
        if (albumID && song.albumID?.toString() !== albumID) {
        // - Quita la canción del álbum anterior (si tenía uno)TENER EN CUENTAS ESTO
        if (song.albumID) {
            await Album.findByIdAndUpdate(song.albumID, {
            $pull: { songs: song._id },
            });
        }

        // - Agrega la canción al nuevo álbum
        await Album.findByIdAndUpdate(albumID, {
            $addToSet: { songs: song._id }, // addToSet evita duplicados
        });
        }
        res.status(200).json(updateSong) 
        
    }catch(err){
        console.error(err)
        next(err)
    }
}
export const PlaySong=async(req,res,next)=>{
    try{
        
        const {user_ID,song_ID,liked}=req.body
        
        let reproducir=await Reproducciones.findOne({user_ID,song_ID})
        if(reproducir){
            reproducir.plays+=1
            reproducir.lastPlayedAt=new Date()
            if(liked!==undefined) reproducir.liked=liked
        }
        else{
            reproducir=new Reproducciones({
            user_ID,
            song_ID,
            plays:1,
            liked:liked||false,
            lastPlayedAt:new Date(),
            firstPlayedAt:new Date()
                
        })
        
        }
        await reproducir.save()
        res.status(200).json(reproducir)
    }catch(err){
        console.error(err)
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
        const {imageFile}=req.files
        const imageURL=await uploadToCloudnary(imageFile)
        const album=new Album({
            title,
            artist,
            releaseYear,
            imageUrl:imageURL
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