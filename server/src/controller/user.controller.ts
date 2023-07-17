import { Controller, Post, Body, Get, Request, Response } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface RequestWithUser extends Request {
  user: User;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @Get('get')
  async findOne(@Response() res): Promise<any> {
    res.status(200).json({
      user: res.locals.user,
    });
  }
}
