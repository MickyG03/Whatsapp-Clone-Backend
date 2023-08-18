import createHttpError from "http-errors";
import validator from "validator";
import {UserModel} from '../models/index.js';
import bcrypt from "bcrypt";

const{DEFAULT_PICTURE,DEFAULT_STATUS}=process.env
export const createUser=async(userData)=>{
    const{name,email,picture,status,password}=userData;

    //validate empty fields
    if (!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all fields.");
      }
    if (!validator.isLength(name,{min:2,max:16,})){
        throw createHttpError.BadRequest("Please make sure name is between 2 to 16 characters long");
    }
    if(status && status.length>64){
        throw createHttpError.BadRequest("Please make sure status is less than 64 characters long");
    }
    if(!validator.isEmail(email)){
      throw createHttpError.BadRequest("Please provide valid email address");
    }

    const checkDb = await UserModel.findOne({email});
    if(checkDb){
      throw createHttpError.Conflict("Email already exists");
    }

    if(!validator.isLength(password,{min:6,max:128})){
      throw createHttpError.BadRequest("Please make sure password is between 6 to 128 characters long");
    }

    //hash password---> to be done in the user model



    //adding user to database

    const user=await new UserModel({
      name,
      email,
      picture:picture || DEFAULT_PICTURE,
      status:status || DEFAULT_STATUS,
      password
    }).save()

    return user;

};

export const signUser = async(email,password) => {
  const user = await UserModel.findOne({email:email.toLowerCase()}).lean();
  if (!user){
    throw createHttpError.NotFound("Invalid credentials,email not found")
  }
  let passwordMatches = await bcrypt.compare(password, user.password);

  if(!passwordMatches){
    throw createHttpError.NotFound("Invalid credentials, password incorrect")
  }

  return user;
};