import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service.js';
import { JournalsResolver } from './journals.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from '../entities/journal.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  providers: [JournalsResolver, JournalsService],
})
export class JournalsModule {}
