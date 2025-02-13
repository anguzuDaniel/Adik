import { InputType, Int, Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { MatchStatus } from '../../enums/MatchStatus.js';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateMatchInput {
  @ApiProperty()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field()
  @Column()
  userId: string;

  @ApiProperty()
  @Field()
  @Column()
  matchedUserId: string;

  @ApiProperty()
  @Field()
  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  static: MatchStatus;
}
