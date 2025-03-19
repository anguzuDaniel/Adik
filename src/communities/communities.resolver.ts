import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommunitiesService } from './communities.service.js';
import { Community } from '../entities/community.entity.js';
import { CreateCommunityInput } from './dto/create-community.input.js';
import { UpdateCommunityInput } from './dto/update-community.input.js';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  createCommunity(@Args('createCommunityInput') createCommunityInput: CreateCommunityInput) {
    return this.communitiesService.create(createCommunityInput);
  }

  @Query(() => [Community], { name: 'communities' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.communitiesService.findAll();
  }

  @Query(() => Community, { name: 'community' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.communitiesService.findOne(id);
  }

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  updateCommunity(
    @Args('id') id: string,
    @Args('updateCommunityInput') updateCommunityInput: UpdateCommunityInput
  ) {
    return this.communitiesService.update(id, updateCommunityInput);
  }

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  removeCommunity(
    @Args('adminId', { type: () => String }) adminId: string,
    @Args('id', { type: () => String }) id: string
  ) {
    return this.communitiesService.remove(adminId, id);
  }
}
