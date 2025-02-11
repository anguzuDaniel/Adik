import { InputType, Int, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../entities/users.entity';

@InputType()
export class CreateJournalInput {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @Column()
  id: number;

  @Field(() => String)
  @Column()
  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  userId: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column('decimal', { precision: 5, scale: 2 })
  sentimentScore: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
