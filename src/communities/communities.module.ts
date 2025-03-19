import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service.js';
import { CommunitiesResolver } from './communities.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from '../entities/community.entity.js';
import { UsersModule } from '../users/users.module.js';
import { UsersService } from '../users/users.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community]),
    UsersModule
  ],
  providers: [CommunitiesResolver, CommunitiesService],
  exports: [CommunitiesService]
})
export class CommunitiesModule {}
