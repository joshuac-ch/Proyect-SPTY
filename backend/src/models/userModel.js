
import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    ClerkID:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
export const User=mongoose.model("User",userSchema)
