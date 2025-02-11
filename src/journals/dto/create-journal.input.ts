import { InputType, Int, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateJournalInput {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  user: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column('float', { nullable: true })
  sentimentScore: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
