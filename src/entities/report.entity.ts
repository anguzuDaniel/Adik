import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportStatus } from '../enums/ReportStatus.js';
import { ReportType } from '../enums/ReportType.js';
import { Users } from './users.entity.js';
import { Community } from './community.entity.js';
import { forwardRef } from '@nestjs/common';

@ObjectType()
@Entity()
export class Report {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Use string-based references for relationships
  @ManyToOne('Users', { nullable: true })
  @Field(() => Users, { nullable: true })
  reportedUser?: any;

  @ManyToOne('Community', { nullable: true })
  @Field(() => Community, { nullable: true })
  reportedCommunity?: any;

  @Field(() => ReportType)
  @Column({ type: 'enum', enum: ReportType })
  type: ReportType;

  @Field()
  @Column('uuid')
  reporterId: string;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  reportedUserId?: string;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
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
}