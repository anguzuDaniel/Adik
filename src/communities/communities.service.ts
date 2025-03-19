import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommunityInput } from './dto/create-community.input.js';
import { UpdateCommunityInput } from './dto/update-community.input.js';
import { Repository } from 'typeorm';
import { Community } from '../entities/community.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community) private communityRepo: Repository<Community>
  ) {}

   async create(createCommunityInput: CreateCommunityInput) {
    const community = await this.communityRepo.findOneByOrFail({ name: createCommunityInput.name })

    if (community) {
      throw new BadRequestException(`Community with name ${createCommunityInput.name} already exists`)
    }

    return this.communityRepo.save(createCommunityInput);
  }

  findAll() {
    return this.communityRepo.find();
  }

  findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid community ID format');
    }

    return this.communityRepo.findOne({ where: { id } });
  }

  async update(id: string, updateCommunityInput: UpdateCommunityInput) {
    if (!id) {
      throw new BadRequestException('Invalid community ID format');
    }

    const updatedCommunity = await this.communityRepo.preload({
      id,
      ...updateCommunityInput,
    });

    if (!updatedCommunity) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }

    return this.communityRepo.save(updatedCommunity).then((savedCommunity) => ({
      message: `Community with ID ${id} updated successfully`,
      community: savedCommunity,
    }));
  }

  async remove(adminId: string, id: string) {
    const community = await this.communityRepo.findOne({
      where: { id },
    });

    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }

    if (!community.adminId || adminId !== community.adminId) {
      throw new BadRequestException('Only the admin can delete the community');
    }

    try {
      await this.communityRepo.remove(community);
      return { message: `Community with ID ${id} removed successfully` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error removing community with ID ${id}: ${error.message}`,
      );
    }
  }
}
