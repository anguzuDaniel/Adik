import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJournalInput } from './dto/create-journal.input.js';
import { UpdateJournalInput } from './dto/update-journal.input.js';
import { Repository } from 'typeorm';
import { Journal } from '../entities/journal.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal) private journalRepository: Repository<Journal>,
  ) {}

  async create(createDto: CreateJournalInput & { userId: string }) {
    return await this.journalRepository.save({
      ...createDto,
      userId: createDto.userId,
    });
  }

  findAll() {
    return this.journalRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const journal = await this.journalRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    return journal;
  }

  async findAllByUserId(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const journals = await this.journalRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });

    if (!journals.length) {
      throw new NotFoundException(`No journals found for user ${userId}`);
    }

    return journals;
  }

  async update(id: string, updateJournalInput: UpdateJournalInput) { // Changed to string
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const journal = await this.journalRepository.preload({
      id,
      ...updateJournalInput
    });

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    return this.journalRepository.save(journal);
  }

  async remove(id: string) {
    const journal = await this.journalRepository.findOne({ where: { id } });

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    try {
      await this.journalRepository.remove(journal);
      return { message: `Journal with ID ${id} removed successfully` };
    } catch (error) {
      throw new InternalServerErrorException(`Error removing journal with ID ${id}: ${error.message}`);
    }
  }
}
