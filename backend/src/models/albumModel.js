import mongoose from 'mongoose'
const AlbumSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    releaseYear:{
        type:Number,
        required:true
    },
    songs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song",
        required:true
    }
},{timestamps:true})
/** @type {import("mongoose").Model<any>} */
export const Album=mongoose.model("Album",AlbumSchema)
