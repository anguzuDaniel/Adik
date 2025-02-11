import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../entities/users.entity';

@ObjectType()
export class Journal {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @Column()
  id: number;

  @Field(() => String)
  @Column()
  @ManyToOne(() => Users, (user) => user.journals, { onDelete: 'CASCADE' })
  userId: Users;

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
