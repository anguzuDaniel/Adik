import { ObjectType, Field, ID } from '@nestjs/graphql';
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
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text', { nullable: false })
  @Field()
  content: string;

  @Column('float', { nullable: true })
  @Field({ nullable: true })
  sentimentScore?: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne(() => Users)
  @Field(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;
}
