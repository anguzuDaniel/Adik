import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommunitiesService } from './communities.service.js';
import { Community } from '../entities/community.entity.js';
import { CreateCommunityInput } from './dto/create-community.input.js';
import { UpdateCommunityInput } from './dto/update-community.input.js';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { User } from '@supabase/supabase-js';
import { Users } from '../entities/users.entity.js';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  createCommunity(
    @Args('createCommunityInput') createCommunityInput: CreateCommunityInput,
    @CurrentUser() user: Users
  ) {
    return this.communitiesService.create(user.id, createCommunityInput);
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
    @Args('adminId', { type: () => String }) adminId: string,
    @Args('id') id: string,
    @Args('updateCommunityInput') updateCommunityInput: UpdateCommunityInput
  ) {
    return this.communitiesService.update(id, adminId, updateCommunityInput);
  }

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  removeCommunity(
    @Args('adminId', { type: () => String }) adminId: string,
    @Args('id', { type: () => String }) id: string
  ) {
    return this.communitiesService.remove(adminId, id);
  }

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  async joinCommunity(
    @Args('communityId') communityId: string,
    @CurrentUser() user: User
  ) {
    return this.communitiesService.addMember(communityId, user.id);
  }

  @Mutation(() => Community)
  @UseGuards(GqlAuthGuard)
  async leaveCommunity(
    @Args('communityId') communityId: string,
    @CurrentUser() user: User
  ) {
    return this.communitiesService.removeMember(communityId, user.id);
  }
}
