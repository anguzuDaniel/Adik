import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  sender_id: number;

  @Column({ type: 'int' })
  receiver_id: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  timestamp: Date;
}
