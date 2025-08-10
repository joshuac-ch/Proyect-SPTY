const mongo=require('mongoose')
const conectionMongo=async()=>{
    try{
        const con=await mongo.connect(process.env.MONGODB_CONNECTION)
        console.log(`Se realizo la conection con Mongo ${con.connection.host}`)
    }catch(err){
        console.error(err.message)
    }
}
module.exports={conectionMongo}