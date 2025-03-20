import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { ReportsResolver } from './reports.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity.js';
import { UsersModule } from '../users/users.module.js';
import { CommunitiesModule } from '../communities/communities.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    UsersModule,
    CommunitiesModule
  ],
  providers: [ReportsResolver, ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
