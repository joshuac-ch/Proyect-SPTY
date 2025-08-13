import mongoose from 'mongoose'
const songSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    audioURL:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    albumID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Album",
        required:false
    }
},{timestamps:true})
/** @type {import("mongoose").Model<any>} */
export const Song=mongoose.model("Song",songSchema)
