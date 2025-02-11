import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '../../enums/ReportStatus';

@ObjectType()
export class Report {
  @ApiProperty()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field()
  @Column()
  reporterId: string;

  @ApiProperty()
  @Field()
  @Column()
  reportedUserId: string;

  @ApiProperty()
  @Field()
  @Column('text')
  reason: string;

  @ApiProperty()
  @Field()
  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;
}
