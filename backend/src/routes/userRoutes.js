import {Router} from "express"
import { ProtectRute } from "../middleware/auth.js"
import { GetAllUsers, GetMessage } from "../controller/userController.js"

const routes=Router()
routes.get("/",(req,res)=>{
    //req.auth.userId
    res.send("esta corriendo el servicio")
})
routes.get("/g",ProtectRute,GetAllUsers)
routes.get("/message/:userID",ProtectRute,GetMessage)
export default routes