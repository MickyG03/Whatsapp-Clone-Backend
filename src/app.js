import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors"
import createHttpError from "http-errors";
import routes from './routes/index.js'

//dotenv config
dotenv.config();

// intializing express app
const app=express();

//specifying use for morgan (http logger)
if (process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

// use for helmet (little http security)
app.use(helmet());

// use for express-json (json request body and url parser)
app.use(express.json());
app.use(express.urlencoded({extends:true}));

// use for mongo-sanitize (secures the mongodb from injections to manipulate db)
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

// use for compression (compress response bodies)
app.use(compression());

//handle file upload
app.use(fileUpload({
    useTempFiles:true,

}));

//cors
app.use(cors());

//routes
app.use("/api/v1",routes)

//http error handling
app.use(async(req,res,next)=> {
    next(createHttpError.NotFound("This route doesnot exist"))
})

app.use(async(err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message,
        },
    });
});

export default app
