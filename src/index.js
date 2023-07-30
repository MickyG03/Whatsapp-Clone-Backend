import mongoose from 'mongoose';
import app from './app.js';
import logger from './configs/logger.config.js';

//seting up .env variables
const {DATABASE_URL} = process.env;
const PORT = process.env.PORT || 8000;

//setting up server
let server;

server = app.listen(PORT,()=>{
    logger.info(`server is listening at ${PORT}`)
    // console.log(process.pid)
});


//handle mongodb connection errors
mongoose.connection.on('error',(err)=>{
    logger.error(`MongoDB connection failed: ${err}`);
    process.exit(1)
});

//mongodb debug


//mongodb connection
mongoose.connect(DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    logger.info("Connected MongoDB Server")
});

//mongoDB debug mode
if(process.env.NODE_ENV !== "production")
{
    mongoose.set("debug",true);
}


// handle server errors

const exithandler = () =>{
    if (server){
        logger.info('server closed');
        process.exit(1);
    }
    else{
        process.exit(1)
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exithandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);


//Signal Termination -> SIGTERM
process.on("SIGTERM",()=>{
    if (server){
        logger.info('server closed');
        process.exit(1);
    }
});

