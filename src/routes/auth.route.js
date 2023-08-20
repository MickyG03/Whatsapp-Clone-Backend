import express from "express"
import trimRequest from "trim-request"
import { login, logout, refreshtoken, register } from "../controllers/auth.controller.js"
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router()

router.route('/register').post(trimRequest.all,register)
router.route('/login').post(trimRequest.all,login)
router.route('/logout').post(trimRequest.all,logout)
router.route('/refreshToken').post(trimRequest.all,refreshtoken)
router.route('/testingauthMiddleware').get(trimRequest.all,authMiddleware,(req,res)=>{
    res.send(req.user)
})


export default router

