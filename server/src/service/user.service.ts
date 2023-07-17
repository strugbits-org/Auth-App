import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: await hash(createUserDto.password, 10),
    });
    return this.userRepository.save(user);
  }

  // find a single user
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  // compare password
  async comparePassword(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<Boolean> {
    return compare(enteredPassword, storedPassword);
  }
}
