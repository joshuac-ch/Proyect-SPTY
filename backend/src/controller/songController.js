import { Reproducciones } from "../models/reproduccionesModel.js"
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
//Ya no se usa el Feature que es igual al GetTopGeneroGlobal
export const GetFeatureSongs=async(req,res,next)=>{
try{
    const topsongsGenero = await Reproducciones.aggregate([
    {
        $group:{
            _id:"$song_ID",
            total_plays:{$sum:"$plays"}
        }
    },
    {
        $lookup:{
            from:"songs",
            foreignField:"_id",
            localField:"_id",
            as:"song"
        }
    },
    {
        $unwind:"$song"
    },
    
    {
        $group: {
        _id: "$song.genero",
        total_plays: { $sum: "$plays" },
        canciones: {
            $push: {
             _id:"$song._id",  
            genero:"$song.genero",
            title: "$song.title",
            artist: "$song.artist",
            imageURL: "$song.imageURL",
            audioURL: "$song.audioURL",
            videoURL: "$song.videoURL",
            total_plays: "$total_plays"
            }
        }
        }
    },
    {
            $project: {                
            canciones: {
                $slice: [
                {
                    $sortArray: {
                    input: "$canciones",
                    sortBy: { total_plays: -1 }
                    }
                },
                1 // ← Cambia este número al top N que quieras
                ]
            }
            }
    },
    {
        $limit:6
    },
     { $unwind: "$canciones" },
     {
    $project: {
      _id: "$canciones._id",
      genero:"$canciones.genero",
      title: "$canciones.title",
      artist: "$canciones.artist",
      imageURL: "$canciones.imageURL",
      audioURL: "$canciones.audioURL",
      videoURL: "$canciones.videoURL",
      total_plays: "$canciones.total_plays"
    }}
    ]);
    res.status(200).json(topsongsGenero)    
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
        const tendencias=await Reproducciones.aggregate([
            {
                $group:{
                    _id:"$song_ID",
                    total_plays:{$sum:"$plays"}
                }
            },
            {$sort:{total_plays:-1}},
            {$limit:4},
            {
                $lookup:{
                    from:"songs",
                    localField:"_id",
                    foreignField:"_id",
                    as:"song"
                    
                }
            },
            {$unwind:"$song"},
            {
                $project:{
                    _id:"$song._id",
                    title:"$song.title",
                    artist:"$song.artist",
                    imageURL:"$song.imageURL",
                    audioURL:"$song.audioURL",
                    videoURL:"$song.videoURL",
                    total_plays:1
                }
            }
        ])
        
    res.json(tendencias)
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const GetGenero=async(req,res,next)=>{
    try{
         const genero=await Song.distinct("genero")
                     
        if(!genero){
            return res.status(404).json({message:"No se encontro el genero"})
        }
        res.status(200).json(genero)
    }catch(err){
        console.error(err.mssage)
        next(err)
    }
}
export const GetTopGeneroSpecific=async(req,res,next)=>{
    try{
        const {genero}=req.params
        const topSongs=await Reproducciones.aggregate([
            {
                $group:{
                    _id:"$song_ID",
                    total_plays:{$sum:"$plays"}
                }
            },
            {
                $lookup:{
                    from:"songs",
                    foreignField:"_id",
                    localField:"_id",
                    as:"song"
                }
            },
            {
                $match:{
                    "song.genero":genero
                }
            },
            {
                $sort:{total_plays:-1}
            },                      
            {
                $unwind:"$song"
            },
            
            {
                $project:{
                    _id:"$song._id",
                    title:"$song.title",
                    artist:"$song.artist",
                    imageURL:"$song.imageURL",
                    audioURL:"$song.audioURL",
                    videoURL:"$song.videoURL",
                    plays:"$song.plays",
                    genero:"$song.genero",
                    releaseYear:"$song.releaseYear",
                    albumID:"$song.albumID",
                    createdAt:"$song.createdAt",
                    total_plays:"$total_plays",

                }
            }

        ])
        res.status(200).json(topSongs)
    }catch(err){
        console.error(err.message)
        next(err)
    }
}
export const GetTopGeneroGlobal=async(req,res,next)=>{
  try{
    const topsongsGenero = await Reproducciones.aggregate([
    {
        $group:{
            _id:"$song_ID",
            total_plays:{$sum:"$plays"}
        }
    },
    {
        $lookup:{
            from:"songs",
            foreignField:"_id",
            localField:"_id",
            as:"song"
        }
    },
    {
        $unwind:"$song"
    },
    
    {
        $group: {
        _id: "$song.genero",
        total_plays: { $sum: "$plays" },
        canciones: {
            $push: {
             _id:"$song._id",
           
            genero:"$song.genero",
            title: "$song.title",
            artist: "$song.artist",
            imageURL: "$song.imageURL",
            audioURL: "$song.audioURL",
            videoURL: "$song.videoURL",
            total_plays: "$total_plays"
            }
        }
        }
    },
    {
            $project: {                
            canciones: {
                $slice: [
                {
                    $sortArray: {
                    input: "$canciones",
                    sortBy: { total_plays: -1 }
                    }
                },
                1 // ← Cambia este número al top N que quieras
                ]
            }
            }
    },
    
     { $unwind: "$canciones" },
     {
    $project: {
      _id: "$canciones._id",
      genero:"$canciones.genero",
      
      title: "$canciones.title",
      artist: "$canciones.artist",
      imageURL: "$canciones.imageURL",
      audioURL: "$canciones.audioURL",
      videoURL: "$canciones.videoURL",
      total_plays: "$canciones.total_plays"
    }}
    ]);
    res.status(200).json(topsongsGenero)    
    }catch(err){
        console.error(err.message)
        next(err)
    }    
}
export const GetSimilarSongs=async(req,res,next)=>{
    try{
        const {id}=req.params
        const baseSong=await Song.findById(id)
        if(!baseSong) return res.status(404).json({message:"No se encontro la cancion"})
        const similarSongs=await Song.aggregate([
            {$match:{
                _id:{$ne: baseSong._id},
                $or:[
                    {genero:baseSong.genero},
                    {artist:baseSong.artist},
                    {tags:{$in:baseSong.tags||[]}}
                ]
            }},
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageURL:1,
                    audioURL:1,
                    videoURL:1,
                    tags:1
                }
            },
            {
                $sample:{size:4}
            }
        ]) 
        res.status(200).json(similarSongs)   
    }catch(err){
        console.error(err.message)
        next(err)
    }
}