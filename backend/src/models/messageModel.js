import mongoose from 'mongoose'
const messageShema=mongoose.Schema({
    senderID:{type:String,required:true},
    recivedID:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})
/** @type {import("mongoose").Model<any>} */
export const Message=mongoose.model("Message",messageShema)
