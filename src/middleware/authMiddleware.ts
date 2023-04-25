import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {User, UserModel} from '../models/User';


interface AuthRequest extends Request {
    user?: User;
  }

export const verifyAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new Error('No token provided');
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret') as JwtPayload;
      console.log(decodedToken);
      const userId = decodedToken.id;
      console.log(userId)
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      console.log(user)
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };