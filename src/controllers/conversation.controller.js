import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { createConversation, doesConversationExist, getUserConversations, populateConversation } from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";
import { populate } from "dotenv";

export const create_open_conversation = async(req,res,next)=>{
    try{
        const sender_id = req.user.userId;
        const {receiver_id, isGroup} = req.body;

        if (isGroup == false){
          if (!receiver_id){
            logger.error("Need user id to start conversation");
            throw createHttpError.BadGateway('Something went wrong!');
            res.status(400);
          }
          const existed_conversation = await doesConversationExist(sender_id,receiver_id,false);

          if (existed_conversation){
              res.json(existed_conversation);
          }
          else{
              let receiver_user= await findUser(receiver_id);
              let convoData = {
                  name:receiver_user.name,
                  picture: receiver_user.picture,
                  isGroup:false,
                  users:[sender_id,receiver_id],
              }
              const newConvo = await createConversation(convoData);
              const populatedConvo = await populateConversation(newConvo._id,"users","-password")
              res.status(200).json(populatedConvo);
          }
        }
        else{

          const existed_group_conversation = await doesConversationExist("","", isGroup);

          res.status(200).json(existed_group_conversation);
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

export const createGroup = async(req,res,next)=>{
    const { name, users } = req.body;
    //add current user to users
    users.push(req.user.userId);
    if (!name || !users) {
      throw createHttpError.BadRequest("Please fill all fields.");
    }
    if (users.length < 2) {
      throw createHttpError.BadRequest(
        "Atleast 2 users are required to start a group chat."
      );
    }
    let convoData = {
      name,
      users,
      isGroup: true,
      admin: req.user.userId,
      picture: process.env.DEFAULT_GROUP_PICTURE,
    };
    try {
      const newConvo = await createConversation(convoData);
      const populatedConvo = await populateConversation(
        newConvo._id,
        "users admin",
        "-password"
      );
      console.log(populatedConvo)
      res.status(200).json(populatedConvo);
    } catch (error) {
      next(error);
    }
  };