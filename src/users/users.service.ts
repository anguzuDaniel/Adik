import { Injectable } from '@nestjs/common';
import { UpdateUsersInput } from './dto/update-users.input';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { CreateUsersInput } from './dto/create-users.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserInput: CreateUsersInput): Promise<Users> {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserInput.email,
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashPassword = await bcrypt.hash(createUserInput.password, 10);
    const user = this.usersRepository.create({
      ...createUserInput,
      password: hashPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUserName(username: string): Promise<Users | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserInput: UpdateUsersInput) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
