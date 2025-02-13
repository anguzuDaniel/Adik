import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { ReportsResolver } from './reports.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportsResolver, ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
