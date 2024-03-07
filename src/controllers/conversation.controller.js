import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { createConversation, doesConversationExist, getUserConversations, populateConversation } from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";
import { populate } from "dotenv";

export const create_open_conversation = async(req,res,next)=>{
    try{
        const sender_id = req.user.userId;
        const {receiver_id} = req.body;
        if (!receiver_id){
            logger.error("Need user id to start conversation");
            throw createHttpError.BadGateway('Something went wrong!');
            res.status(400);
        }
        const existed_conversation = await doesConversationExist(sender_id,receiver_id);

        if (existed_conversation){
            res.json(existed_conversation);
        }
        else{
            let receiver_user= await findUser(receiver_id);
            let convoData = {
                name:receiver_user.name,
                isGroup:false,
                users:[sender_id,receiver_id],
            }
            const newConvo = await createConversation(convoData);
            const populatedConvo = await populateConversation(newConvo._id,"users","-password")
            res.status(200).json(populatedConvo);
        }

    }catch(error){
        next(error)
    }
}

export const getConversations = async(req,res,next)=>{
    try{
        const user_id = req.user.userId;
        const conversations = await getUserConversations(user_id);
        res.status(200).json(conversations);
    }
    catch(error){
        next(error);
    }
}