import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JournalsService } from './journals.service.js';
import { Journal } from '../entities/journal.entity.js';
import { CreateJournalInput } from './dto/create-journal.input.js';
import { UpdateJournalInput } from './dto/update-journal.input.js';
import { ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { User } from '@supabase/supabase-js';

@Resolver(() => Journal)
export class JournalsResolver {
  constructor(private readonly journalsService: JournalsService) {}

  @Mutation(() => Journal)
  @ApiOperation({ summary: 'Create a journal.' })
  @UseGuards(GqlAuthGuard)
  createJournal(
    @Args('createJournalInput') createJournalInput: CreateJournalInput,
    @CurrentUser() user: User
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.journalsService.findOne(id);
  }

  @Mutation(() => Journal)
  @ApiOperation({ summary: 'Update a journal.' })
  @UseGuards(GqlAuthGuard)
  updateJournal(
    @Args('updateJournalInput') updateJournalInput: UpdateJournalInput,
  ) {
    return this.journalsService.update(
      updateJournalInput.id,
      updateJournalInput,
    );
  }

  @Mutation(() => Journal)
  @ApiOperation({ summary: 'Remove a journal.' })
  @UseGuards(GqlAuthGuard)
  removeJournal(@Args('id', { type: () => Int }) id: number) {
    return this.journalsService.remove(id);
  }
}
