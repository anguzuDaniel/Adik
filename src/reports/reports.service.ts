import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReportInput } from './dto/create-report.input.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/index.js';
import { UsersService } from '../users/users.service.js';
import { CommunitiesService } from '../communities/communities.service.js';
import { ReportStatus } from '../enums/ReportStatus.js';
import { ReportType } from '../enums/ReportType.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
  ) {}

  async create(
    createReportInput: CreateReportInput,
    reporterId: string
  ): Promise<Report> {
    if (
      !createReportInput.reportedUserId &&
      !createReportInput.reportedCommunityId
    ) {
      throw new BadRequestException(
        'Must specify either user or community to report'
      );
    }

    const reporter = await this.usersService.findOne(reporterId);
    if (!reporter) {
      throw new NotFoundException('Reporter user not found');
    }

    if (createReportInput.type === ReportType.USER && createReportInput.reportedUserId) {
      const user = await this.usersService.findOne(
        createReportInput.reportedUserId
      );

      if (!user) {
        throw new NotFoundException('Reported user not found');
      }
    } else {
      if (createReportInput.reportedCommunityId) {
        const community = await this.communitiesService.findOne(
          createReportInput.reportedCommunityId
        );

        if (!community) {
          throw new NotFoundException('Reported community not found');
        }
      }
    }

    const report = this.reportRepository.create({
      ...createReportInput,
      reporterId,
      status: ReportStatus.PENDING,
    });

    return this.reportRepository.save(report);
  }

  async updateStatus(id: string, status: ReportStatus): Promise<Report> {
    const report = await this.reportRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException(`Report ${id} not found`);
    }

    report.status = status;
    return this.reportRepository.save(report);
  }

  findAll() {
    return this.reportRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      throw new UnauthorizedException('You need to provide and Id.');
    }

    const report = await this.reportRepository.findOneBy({ id });

    if (!report) {
      throw new Error(`Report with id ${id} doesn't exist.`);
    }

    return report;
  }

  async remove(id: string) {
    if (!id) {
      throw new UnauthorizedException('You need to provide an Id.');
    }

    const report = await this.reportRepository.findOneBy({ id });

    if (!report) {
      throw new Error(`Report with Id ${id} not found!`);
    }

    return this.reportRepository.remove(report);
  }
}
