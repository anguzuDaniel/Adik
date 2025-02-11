import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Journal {
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
