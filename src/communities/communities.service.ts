import {
  BadRequestException,
  ConflictException, Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommunityInput } from './dto/create-community.input.js';
import { UpdateCommunityInput } from './dto/update-community.input.js';
import { Repository } from 'typeorm';
import { Community } from '../entities/community.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community) private communityRepo: Repository<Community>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createCommunityInput: CreateCommunityInput
  ): Promise<Community> {
    const creator = await this.usersService.findOne(userId);
    if (!creator) {
      throw new BadRequestException('User not found');
    }

    const existingCommunity = await this.communityRepo.findOneBy({
      name: createCommunityInput.name
    });
    if (existingCommunity) {
      throw new ConflictException(
        `Community '${createCommunityInput.name}' already exists`
      );
    }

    const newCommunity = this.communityRepo.create({
      ...createCommunityInput,
      adminId: userId,
      members: [creator],
      memberNumber: 1
    });

    try {
      return await this.communityRepo.save(newCommunity);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create community');
    }
  }

  findAll() {
    return this.communityRepo.find({
      relations: ['members']
    });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Invalid community ID');
    }

    const community = await this.communityRepo.findOne({
      where: { id },
      relations: ['members']
    });

    if (!community) {
      throw new NotFoundException(`Community ${id} not found`);
    }
    return community;
  }

  async update(id: string, adminId: string, updateInput: UpdateCommunityInput) {
    const community = await this.findOne(id);

    if (community.adminId !== adminId) {
      throw new BadRequestException('Only the community admin can update the community');
    }

    const updated = this.communityRepo.merge(community, updateInput);

    try {
      return await this.communityRepo.save(updated);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update community: ${error.message}`);
    }
  }

  async remove(adminId: string, communityId: string) {
    const community = await this.findOne(communityId);

    if (community.adminId !== adminId) {
      throw new BadRequestException('Only community admin can delete');
    }

    try {
      await this.communityRepo.remove(community);
      return { message: `Community ${communityId} deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete community');
    }
  }

  async addMember(communityId: string, userId: string): Promise<Community> {
    const [community, user] = await Promise.all([
      this.findOne(communityId),
      this.usersService.findOne(userId)
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (community.members.some(m => m.id === userId)) {
      throw new ConflictException('User already in community');
    }

    community.members.push(user);
    community.memberNumber = community.members.length;

    return this.communityRepo.save(community);
  }

  async removeMember(communityId: string, userId: string): Promise<Community> {
    const community = await this.findOne(communityId);

    const initialCount = community.members.length;
    community.members = community.members.filter(m => m.id !== userId);

    if (community.members.length === initialCount) {
      throw new NotFoundException('User not in community');
    }

    community.memberNumber = community.members.length;
    return this.communityRepo.save(community);
  }
}
