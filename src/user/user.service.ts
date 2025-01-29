import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = this.usersRepository.create({
      ...createUserInput,
      password: hashPassword,
    });
    return this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns a user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByUserName(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} ${updateUserInput.username} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
