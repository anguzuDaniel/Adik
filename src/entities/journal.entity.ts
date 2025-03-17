import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn, Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity.js';
import { User } from '@supabase/supabase-js';

@ObjectType()
@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column('float', { nullable: true })
  sentimentScore?: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  @Field(() => Users)
  user: Users;

  @Column({ name: 'user_id', type: 'uuid' })
  @Field(() => ID)
  userId: string;
}
