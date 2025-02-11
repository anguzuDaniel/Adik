import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JournalsService } from './journals.service';
import { Journal } from './entities/journal.entity';
import { CreateJournalInput } from './dto/create-journal.input';
import { UpdateJournalInput } from './dto/update-journal.input';

@Resolver(() => Journal)
export class JournalsResolver {
  constructor(private readonly journalsService: JournalsService) {}

  @Mutation(() => Journal)
  createJournal(@Args('createJournalInput') createJournalInput: CreateJournalInput) {
    return this.journalsService.create(createJournalInput);
  }

  @Query(() => [Journal], { name: 'journals' })
  findAll() {
    return this.journalsService.findAll();
  }

  @Query(() => Journal, { name: 'journal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.journalsService.findOne(id);
  }

  @Mutation(() => Journal)
  updateJournal(@Args('updateJournalInput') updateJournalInput: UpdateJournalInput) {
    return this.journalsService.update(updateJournalInput.id, updateJournalInput);
  }

  @Mutation(() => Journal)
  removeJournal(@Args('id', { type: () => Int }) id: number) {
    return this.journalsService.remove(id);
  }
}
