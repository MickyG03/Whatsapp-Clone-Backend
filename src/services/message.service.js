import createHttpError from "http-errors";
import { ConversationModel, MessageModel } from "../models/index.js";

export const createMessage= async(data)=>{

    let newMessage = await MessageModel.create(data);
    if(!newMessage) throw createHttpError.BadRequest('something went wrong');
    return newMessage;

};
export const populateMessage= async(id)=>{

    let msg = await MessageModel.findById(id).populate({
        path:'sender',select:'name picture', model:'UserModel',
    }).populate({
        path:'conversation',
        select:"name picture isGroup users",
        model: "ConversationModel",
        populate:{
            path:'users',
            select:'name email picture status',
            model:"UserModel",

        }
    });
    if(!msg) throw createHttpError.BadRequest("Something went wrong");
    return msg;

};
export const updateLatestMessage=async(convo_id,newMessage)=>{
    const updatedConvo= await ConversationModel.findByIdAndUpdate(convo_id,{
        latestMessage:newMessage,
    });
    if (!updatedConvo) throw createHttpError.BadRequest("Something went wrong");

    return updatedConvo;
}

export const getConvoMessages = async(convo_id) =>{

    const messages = await MessageModel.find({conversation:convo_id})
    .populate("sender","name picture email status").populate('conversation');

    if (!messages) throw createHttpError.BadRequest("something went wrong");
    return messages;

}