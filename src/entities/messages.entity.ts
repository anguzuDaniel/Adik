import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Messages {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  senderId: string;

  @Field(() => String)
  @Column()
  receiverId: string;

  @Field(() => String)
  @Column()
  content: string;

  // Replying to message
  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  timestamp: Date;
}
