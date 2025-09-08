
import { clerkClient } from '@clerk/express'
export const ProtectRute=async(req,res,next)=>{
    const auth=req.auth()
    if(!auth?.userId){
        return res.status(401).json({message:"No autorizado"})
    }
    next()
}
export const requireAdmin=async(req,res,next)=>{
    try{
        const auth=req.auth()
        const currenUser=await clerkClient.users.getUser(auth?.userId)
        const admin=currenUser.primaryEmailAddress.emailAddress==process.env.ADMIN_EMAIL     
        if(!admin){
            return res.status(403).json({message:"No eres admin"})
        }
        next()
    }catch(err){
        console.error(err.message)
    }
}
//export {requireAdmin,ProtectRute}