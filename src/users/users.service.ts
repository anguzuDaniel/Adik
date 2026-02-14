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
    // 1. Try to find by Supabase ID
    let user = await this.usersRepository.findOneBy({
      id: supabaseUser.id
    });

    if (user) {
      return user;
    }

    // 2. Fallback: find by email (user might exist from signup with a different ID path)
    user = await this.usersRepository.findOneBy({
      email: supabaseUser.email,
    });

    if (user) {
      // Update the ID to match the Supabase auth ID if different
      if (user.id !== supabaseUser.id) {
        console.log(`[Users] Updating user ID from ${user.id} to ${supabaseUser.id} for ${supabaseUser.email}`);
        await this.usersRepository.update({ email: supabaseUser.email }, { id: supabaseUser.id });
        user.id = supabaseUser.id;
      }
      return user;
    }

    // 3. User doesn't exist at all — create them
    user = this.usersRepository.create({
      id: supabaseUser.id,
      email: supabaseUser.email,
      username: supabaseUser.metadata?.username || supabaseUser.email.split('@')[0],
      role: Role.USER,
      recoveryStage: RecoveryStage.PRE_CONTEMPLATION,
    });

    return await this.usersRepository.save(user);
  }

  async findBySupabaseId(supabaseId: string): Promise<Users | null> {
    return this.usersRepository.findOne({
      where: { id: supabaseId },
      cache: true
    });
  }
}
