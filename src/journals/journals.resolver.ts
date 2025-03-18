import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { JournalsService } from './journals.service.js';
import { Journal } from '../entities/journal.entity.js';
import { CreateJournalInput } from './dto/create-journal.input.js';
import { UpdateJournalInput } from './dto/update-journal.input.js';
import { ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Users } from '../entities/users.entity.js';

@Resolver(() => Journal)
export class JournalsResolver {
  constructor(private readonly journalsService: JournalsService) {}

  @Mutation(() => Journal)
  @ApiOperation({ summary: 'Create a journal.' })
  @UseGuards(GqlAuthGuard)
  createJournal(
    @Args('createJournalInput') createJournalInput: CreateJournalInput,
    @CurrentUser() user: Users
  ) {
    return this.journalsService.create({
      ...createJournalInput,
      userId: user.id
    });
  }

  @Query(() => [Journal], { name: 'journals' })
  @ApiOperation({ summary: 'Find all journal.' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.journalsService.findAll();
  }

  @Query(() => Journal, { name: 'journal' })
  @ApiOperation({ summary: 'Find a journal by id.' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.journalsService.findOne(id);
  }

  @Query(() => [Journal], { name: 'getJournalByUserId' })
  @ApiOperation({ summary: 'Find a journal by id.' })
  @UseGuards(GqlAuthGuard)
  getJournalByUserId(@Args('userId', { type: () => ID }) userId: string) {
    return this.journalsService.findAllByUserId(userId);
  }

  @Mutation(() => Journal)
  @ApiOperation({ summary: 'Update a journal.' })
  @UseGuards(GqlAuthGuard)
  updateJournal(
    @Args('id', { type: () => String }) id: string,
    @Args('updateJournalInput') updateJournalInput: UpdateJournalInput,
  ) {
    return this.journalsService.update(
      id,
      updateJournalInput
    );
  }

  @Mutation(() => Journal)
  @ApiOperation({ summary: 'Remove a journal.' })
  @UseGuards(GqlAuthGuard)
  removeJournal(@Args('id', { type: () => String }) id: string) {
    return this.journalsService.remove(id);
  }
}
