import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface DecodedToken {
  email: string;
  password: string;
}

interface RequestWithUser extends Request {
  user: User;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (token) {
      try {
        const decodedToken = verify(token, process.env.JWT_SECRET) as DecodedToken;
        const user = await this.authService.validateUser(decodedToken.email);
        res.locals.user = user;
      } catch (error) {
        return res.status(401).json({
          message: 'Invalid token',
        });
      }
      console.log(res.locals)
      next();
    } else {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  }
}
