import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReportInput } from './dto/create-report.input.js';
import { UpdateReportInput } from './dto/update-report.input.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  create(createReportInput: CreateReportInput) {
    return this.reportRepository.create(createReportInput);
  }

  findAll() {
    return this.reportRepository.find();
  }

  async findOne(id: number) {
    if (!id) {
      throw new UnauthorizedException('You need to provide and Id.');
    }

    const report = await this.reportRepository.findOneBy({ id });

    if (!report) {
      throw new Error(`Report with id ${id} doesn't exist.`);
    }

    return report;
  }

  async update(id: number, updateReportInput: UpdateReportInput) {
    if (id === null || id === undefined) {
      throw new NotFoundException('You need to provide and Id.');
    }

    const report = await this.reportRepository.findOneBy({ id });

    if (!report) {
      throw new NotFoundException(`Report with id ${id} doesn't exist.`);
    }

    const updatedReport = { ...report, ...updateReportInput };

    return await this.reportRepository.save(updatedReport);
  }

  async remove(id: number) {
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
