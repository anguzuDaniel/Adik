import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateJournalInput {
  @Column('text')
  @Field()
  content: string;

  @Column('float', { nullable: true })
  @Field({ nullable: true })
  sentimentScore?: number;
}
