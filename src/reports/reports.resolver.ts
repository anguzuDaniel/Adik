import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportsService } from './reports.service.js';
import { Report } from './entities/report.entity.js';
import { CreateReportInput } from './dto/create-report.input.js';
import { UpdateReportInput } from './dto/update-report.input.js';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Mutation(() => Report)
  createReport(@Args('createReportInput') createReportInput: CreateReportInput) {
    return this.reportsService.create(createReportInput);
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
  updateReport(@Args('updateReportInput') updateReportInput: UpdateReportInput) {
    return this.reportsService.update(updateReportInput.id, updateReportInput);
  }

  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.remove(id);
  }
}
