import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn, Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity.js';

@ObjectType()
@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('text')
  @Field()
  content: string;

  @Column('float', { nullable: true })
  @Field({ nullable: true })
  sentimentScore?: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;
}
