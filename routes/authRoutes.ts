import express from 'express'
import { changePassword, login, register ,getAllUsers} from '../controllers/authControllers';
import { verifyAuthMiddleware } from '../middleware/authMiddleware';

export const authRoutes = express.Router();

authRoutes.get('/allUsers', getAllUsers)
authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.post('/changepassword',verifyAuthMiddleware, changePassword )