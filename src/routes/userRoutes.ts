import express from 'express'
import { getAllUsers } from '../controllers/userControllers';
import { verifyAuthMiddleware } from '../middleware/authMiddleware';

export const userRoutes = express.Router();

userRoutes.get('/all',getAllUsers)
//userRoutes.get('/:id',getUser)
//userRoutes.put('/:id', verifyAuthMiddleware,updateUserInfo)
//userRoutes.delete('/:id',verifyAuthMiddleware, deleteUser)




