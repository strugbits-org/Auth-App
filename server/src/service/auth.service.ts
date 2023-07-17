import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // validate user
  async validateUser(email: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // login user
  async login(user: any) {
    const userFound = await this.userService.findOne(user.email);
    if (!userFound) {
      return {
        message: 'Invalid credentials',
      };
    }
    const isMatch = await this.userService.comparePassword(
      user.password,
      userFound.password,
    );
    if (!isMatch) {
      return {
        message: 'Invalid credentials',
      };
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        name: userFound.name,
        email: userFound.email,
        id: userFound.id,
      },
    };
  }
}
