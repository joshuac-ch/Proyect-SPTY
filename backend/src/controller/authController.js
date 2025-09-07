import { User } from '../models/userModel.js'
export const AuthCall=async(req,res)=>{
    try{
        const {id,firstName,lastName,imageUrl}=req.body
        const user=await User.findOne({ClerkID:id}) 
        if(!user){
            await User.create({
                ClerkID:id,
                fullname:`${firstName} ${lastName}`,
                imageUrl
            })
        }
        res.status(200).json({message:"Se creo el usuario"})   
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
