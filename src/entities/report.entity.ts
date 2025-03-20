import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportStatus } from '../enums/ReportStatus.js';
import { Community } from './community.entity.js';
import { Users } from './users.entity.js';
import { ReportType } from '../enums/ReportType.js';

@ObjectType()
@Entity()
export class Report {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ReportType)
  @Column({ type: 'enum', enum: ReportType })
  type: ReportType;

  @Field()
  @Column()
  reporterId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reportedUserId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reportedCommunityId?: string;

  @Field()
  @Column('text')
  reason: string;

  @Field(() => ReportStatus)
  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, { nullable: true })
  @Field(() => Users, { nullable: true })
  reportedUser?: Users;

  @ManyToOne(() => Community, { nullable: true })
  @Field(() => Community, { nullable: true })
  reportedCommunity?: Community;

  @ManyToOne(() => Users)
  @Field(() => Users)
  reporter: Users;
}
