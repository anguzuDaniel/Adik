import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsResolver } from './journals.resolver';

@Module({
  providers: [JournalsResolver, JournalsService],
})
export class JournalsModule {}
