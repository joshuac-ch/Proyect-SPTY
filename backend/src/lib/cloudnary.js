//const cloudinary=require('cloudinary')
import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
//const dotenv=require('dotenv')
dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDNARY_NAME,
    api_key:process.env.APY_KEY_CLOUDNARY,
    api_secret:process.env.APY_KEY_CLOUDNARY_SECRET,
    
})
export default cloudinary