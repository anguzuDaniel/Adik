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

  @ManyToOne(() => forwardRef(() => Users) as unknown as typeof Users,
    {
      nullable: true,
    }
  )
  @Field(() => forwardRef(() => Users), { nullable: true })
  reportedUser?: any;

  @ManyToOne(() => forwardRef(() => Community) as unknown as typeof Community, {
    nullable: true,
  })
  @Field(() => forwardRef(() => Community), { nullable: true })
  reportedCommunity?: Community;

  @ManyToOne(
    () => forwardRef(() => Users) as unknown as typeof Users,
    (user) => user.reports,
  )
  @Field(() => forwardRef(() => Users))
  reporter: any;

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
