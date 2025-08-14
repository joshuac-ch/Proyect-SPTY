import { User } from '../models/userModel.js'
export const AuthCall=async(req,res)=>{
    try{
        const {id,FirstName,LastName,imageUrl}=req.body
        const user=await User.findOne({clerkId:id}) 
        if(!user){
            await User.create({
                clerkId:id,
                FullName:`${FirstName} ${LastName}`,
                imageUrl
            })
        }
        res.status(200).json({message:"Se creo el usuario"})   
    }catch(err){
        console.error("Hubo un error",err.message)
    }
}
