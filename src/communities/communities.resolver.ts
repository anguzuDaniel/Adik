import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommunitiesService } from './communities.service.js';
import { Community } from '../entities/community.entity.js';
import { CreateCommunityInput } from './dto/create-community.input.js';
import { UpdateCommunityInput } from './dto/update-community.input.js';

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Mutation(() => Community)
  createCommunity(@Args('createCommunityInput') createCommunityInput: CreateCommunityInput) {
    return this.communitiesService.create(createCommunityInput);
  }

  @Query(() => [Community], { name: 'communities' })
  findAll() {
    return this.communitiesService.findAll();
  }

  @Query(() => Community, { name: 'community' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.communitiesService.findOne(id);
  }

  @Mutation(() => Community)
  updateCommunity(
    @Args('id') id: string,
    @Args('updateCommunityInput') updateCommunityInput: UpdateCommunityInput
  ) {
    return this.communitiesService.update(id, updateCommunityInput);
  }

  @Mutation(() => Community)
  removeCommunity(@Args('id', { type: () => String }) id: string) {
    return this.communitiesService.remove(id);
  }
}
