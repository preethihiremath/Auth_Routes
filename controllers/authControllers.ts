import {Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User,   } from '../models/User';

export const getAllUsers = async (req: Request, res: Response)=> {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

export const register= async (req:Request, res:Response)=>{

    console.log(req.body)
    try{
        const {email,password}= req.body;
        //check if they already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'user already exist'});
        }
        console.log(email)
        console.log(password)
        const hashedPassword =  await bcrypt.hash(password,12);
        const newUser = new User({email, password:hashedPassword});
        await newUser.save()
        res.status(201).json({ message: 'New User created successfully' });

    }
    catch(error:any){

        res.status(500).json({ message: error.message});
    }
}

export const login = async (req:Request, res:Response) =>{
    const {email, password}= req.body;
    try{
       
        //Check if User Exists
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message: 'No User, Please Register'});
        }
        //Check if password Matches
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            return res.status(401).json({message:'OOPS Wrong Password'});
        }

        //Create Token if Valid
        const token =jwt.sign({id: existingUser._id, email:existingUser.email, isAdmin: existingUser.isAdmin}, 'secret', { expiresIn: '1d' })
        res.status(200).json({result:existingUser, token});
    }
    catch(error){
        res.status(500).json({ message: error});
    }
}

export const changePassword = async (req:Request, res:Response) => {
    const {_id, oldPassword, newPassword} = req.body;

    try{
    const existingUser = await User.findById(_id);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'OOPS Wrong Password' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      existingUser.password = hashedPassword;
      await existingUser.save();

      res.status(200).json({ message: 'Password changed successfully' });
    }
    catch(error){
        res.status(500).json({ message: error});
    }
}