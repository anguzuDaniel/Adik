import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsResolver } from './journals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  providers: [JournalsResolver, JournalsService],
})
export class JournalsModule {}
