import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { MatchesResolver } from './matches.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchesResolver, MatchesService],
})
export class MatchesModule {}
