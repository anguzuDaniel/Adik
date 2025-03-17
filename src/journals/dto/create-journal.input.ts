import { InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateJournalInput {
  @Column('text')
  content: string;

  @Column('float', { nullable: true })
  sentimentScore?: number;
}
