import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReportsService } from './reports.service.js';
import { Report } from '../entities/index.js';
import { CreateReportInput } from './dto/create-report.input.js';
import { ReportType } from '../enums/ReportType.js';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { User } from '@supabase/supabase-js';
import { ReportStatus } from '../enums/ReportStatus.js';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';

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
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reportsService.findOne(id);
  }

  @Mutation(() => Report)
  updateReport(
    @Args('id', { type: () => String }) id: string,
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
  removeReport(@Args('id', { type: () => String }) id: string) {
    return this.reportsService.remove(id);
  }
}
