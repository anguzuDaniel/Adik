import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity.js';

@ObjectType()
@Entity()
export class Community {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ name: 'member_number' })
  @Field(() => Int)
  memberNumber: number;

  @Column({ type: 'text' })
  @Field()
  description: string;

  @Column({ type: 'double precision' })
  @Field(() => Float)
  rating: number;

  @Column({ type: 'simple-array' })
  @Field(() => [String])
  groupTags: string[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToMany(() => Users)
  @JoinTable()
  @Field(() => [Users])
  members: Users[];
}