import express from "express"
import dotenv from "dotenv"

//dotenv config
dotenv.config();

// intializing express app
const app=express();

app.post('/test',(req,res)=>(

    res.send("hello from server")

));

export default app
