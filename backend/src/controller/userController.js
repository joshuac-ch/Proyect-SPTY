import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
export const GetAllUsers=async(req,res,next)=>{
    try{
        //const currentUserId=req.auth.userId
        //const user=await User.find({clerkId:{$ne:currentUserId}})
        const user=await User.find()
        res.status(200).json(user)
    }catch(err){
        console.error(`Hubo un error ${err.message}`)
        next(err)
    }
}
export const GetMessage=async(req,res,next)=>{
    try{
        const myID=req.auth.userId 
        const {userID}=req.params
        const messages=await Message.find({
            $or:[
                {senderID:userID,recivedID:myID},
                {senderID:myID,recivedID:userID}
            ]
        }).sort({createdAt:-1})
        res.status(200).json(messages)
    }catch(err){
        next(err)
    }
}