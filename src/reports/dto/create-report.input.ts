import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ReportStatus } from '../../enums/ReportStatus';

@InputType()
export class CreateReportInput {
  @ApiProperty()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field()
  @Column()
  reporterId: string;

  @ApiProperty()
  @Column()
  reportedUserId: string;

  @ApiProperty()
  @Field()
  reason: string;

  @ApiProperty()
  @Field(() => ReportStatus)
  status: ReportStatus;
}
