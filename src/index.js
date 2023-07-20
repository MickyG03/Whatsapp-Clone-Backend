import app from './app.js'
import dotenv from "dotenv"

//seting up .env config
dotenv.config();

//seting up .env variables
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
});