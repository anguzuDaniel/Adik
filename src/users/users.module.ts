import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersResolver } from './users.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
