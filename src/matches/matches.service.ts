import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchInput } from './dto/create-match.input.js';
import { UpdateMatchInput } from './dto/update-match.input.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
  ) {}

  create(createMatchInput: CreateMatchInput) {
    return this.matchRepository.create(createMatchInput);
  }

  findAll() {
    return this.matchRepository.find();
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Please provide and Id');
    }

    return await this.matchRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMatchInput: UpdateMatchInput) {
    if (!id) {
      throw new NotFoundException('Please provide and Id');
    }

    const match = await this.matchRepository.findOne({ where: { id } });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return this.matchRepository.update(id, updateMatchInput);
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException('Please provide and Id');
    }

    const match = await this.matchRepository.findOne({ where: { id } });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return await this.matchRepository.remove(match);
  }
}
