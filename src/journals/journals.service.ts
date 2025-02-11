import { Injectable } from '@nestjs/common';
import { CreateJournalInput } from './dto/create-journal.input';
import { UpdateJournalInput } from './dto/update-journal.input';
import { Repository } from 'typeorm';
import { Journal } from './entities/journal.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal) private journalRepository: Repository<Journal>,
  ) {}

  async create(createJournalInput: CreateJournalInput) {
    const journal = this.journalRepository.create(createJournalInput);
    return await this.journalRepository.save(journal);
  }

  findAll() {
    return this.journalRepository.find();
  }

  findOne(id: number) {
    return this.journalRepository.find({ where: { id } });
  }

  update(id: number, updateJournalInput: UpdateJournalInput) {
    return this.journalRepository.update(id, updateJournalInput);
  }

  async remove(id: number) {
    const journal = await this.findOne(id);

    if (!journal) {
      throw new Error('Journal not found');
    }

    return this.journalRepository.remove(journal);
  }
}
