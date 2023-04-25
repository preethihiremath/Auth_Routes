import { Document,Schema, model } from "mongoose";

interface User{
    email:string;
    password:string
    isAdmin: boolean;
}

interface UserModel extends User,Document{}

const userSchema = new Schema<UserModel>(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    }, 
)

const User= model<UserModel> ('User', userSchema);

export {User,UserModel};