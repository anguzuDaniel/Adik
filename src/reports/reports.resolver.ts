import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportsService } from './reports.service.js';
import { Report } from '../entities/report.entity.js';
import { CreateReportInput } from './dto/create-report.input.js';
import { ReportType } from 'src/enums/ReportType.js';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator.js';
import { User } from '@supabase/supabase-js';
import { ReportStatus } from '../enums/ReportStatus.js';
import { GqlAuthGuard } from 'src/auth/dto/gql-auth.guard.js';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Mutation(() => Report)
  createReport(
    @Args('input') input: CreateReportInput,
    @CurrentUser() user: User
  ) {
    if (input.type === ReportType.USER && input.reportedUserId === user.id) {
      throw new BadRequestException('Cannot report yourself');
    }

    return this.reportsService.create(input, user.id);
  }

  @Query(() => [Report], { name: 'reports' })
  findAll() {
    return this.reportsService.findAll();
  }

  @Query(() => Report, { name: 'report' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.findOne(id);
  }

  @Mutation(() => Report)
  updateReport(
    @Args('id') id: number,
    @Args('status') status: ReportStatus
  ) {
    return this.reportsService.updateStatus(id, status);
  }

  @Query(() => [Report])
  @UseGuards(GqlAuthGuard)
  getReports() {
    return this.reportsService.findAll();
  }

  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.remove(id);
  }
}
