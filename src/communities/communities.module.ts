import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service.js';
import { CommunitiesResolver } from './communities.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from '../entities/community.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  providers: [CommunitiesResolver, CommunitiesService],
})
export class CommunitiesModule {}
