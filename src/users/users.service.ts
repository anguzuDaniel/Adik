import { Injectable } from '@nestjs/common';
import { UpdateUsersInput } from './dto/update-users.input.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity.js';
import { CreateUsersInput } from './dto/create-users.input.js';
import { Role } from '../enums/Role.js';
import { RecoveryStage } from '../enums/RecoveryStage.js';

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

    const user = this.usersRepository.create({
      ...createUserInput,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserInput: UpdateUsersInput) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async remove(id: string) {
    return this.usersRepository.delete({ id });
  }

  async findOrCreateFromSupabase(supabaseUser: {
    id: string;
    email: string;
    metadata: any;
  }): Promise<Users> {
    let user = await this.usersRepository.findOneBy({
      id: supabaseUser.id
    });

    if (!user) {
      user = this.usersRepository.create({
        id: supabaseUser.id,
        email: supabaseUser.email,
        username: supabaseUser.metadata?.username || supabaseUser.email.split('@')[0],
        role: Role.USER,
        recoveryStage: RecoveryStage.PRE_CONTEMPLATION,
      });

      await this.usersRepository.save(user);
    }

    return user;
  }

  async findBySupabaseId(supabaseId: string): Promise<Users | null> {
    return this.usersRepository.findOne({
      where: { id: supabaseId },
      cache: true
    });
  }
}
