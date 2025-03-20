import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MatchesService } from './matches.service.js';
import { Match } from '../entities/match.entity.js';
import { CreateMatchInput } from './dto/create-match.input.js';
import { UpdateMatchInput } from './dto/update-match.input.js';

@Resolver(() => Match)
export class MatchesResolver {
  constructor(private readonly matchesService: MatchesService) {}

  @Mutation(() => Match)
  createMatch(@Args('createMatchInput') createMatchInput: CreateMatchInput) {
    return this.matchesService.create(createMatchInput);
  }

  @Query(() => [Match], { name: 'matches' })
  findAll() {
    return this.matchesService.findAll();
  }

  @Query(() => Match, { name: 'match' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.matchesService.findOne(id);
  }

  @Mutation(() => Match)
  updateMatch(@Args('updateMatchInput') updateMatchInput: UpdateMatchInput) {
    return this.matchesService.update(updateMatchInput.id, updateMatchInput);
  }

  @Mutation(() => Match)
  removeMatch(@Args('id', { type: () => Int }) id: number) {
    return this.matchesService.remove(id);
  }
}
