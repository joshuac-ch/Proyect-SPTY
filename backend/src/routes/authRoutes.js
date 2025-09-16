import {Router} from "express"
//const express=require("express")
import { AuthCall } from "../controller/authController.js"
//const { AuthCall } = require("../controller/authController")
const router=Router()
router.post("/",AuthCall)
export default router