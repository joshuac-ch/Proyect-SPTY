import mongoose from 'mongoose'
export const conectionMongo=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log(`Se realizo la conection con Mongo ${con.connection.host}`)
    }catch(err){
        console.error(err.message)
    }
}
//module.exports={conectionMongo}