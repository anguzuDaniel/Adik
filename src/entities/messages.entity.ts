import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  senderId: string;

  @Field(() => String)
  @Column()
  receiverId: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  timestamp: Date;
}
