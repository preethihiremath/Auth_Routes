import express from 'express'
import { changePassword, login, register ,getAllUsers, logout} from '../controllers/authControllers';
import { verifyAuthMiddleware } from '../middleware/authMiddleware';

export const authRoutes = express.Router();

authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.post('/logout',logout)
authRoutes.post('/changepassword',verifyAuthMiddleware, changePassword )
