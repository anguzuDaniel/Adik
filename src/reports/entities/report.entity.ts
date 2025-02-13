import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ReportStatus } from '../../enums/ReportStatus.js';

@ObjectType()
@Entity()
export class Report {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  reporterId: string;

  @Field()
  @Column()
  reportedUserId: string;

  @Field()
  @Column('text')
  reason: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;
}
