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