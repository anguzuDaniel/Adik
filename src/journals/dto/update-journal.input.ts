import { CreateJournalInput } from './create-journal.input.js';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJournalInput extends PartialType(CreateJournalInput) {}
