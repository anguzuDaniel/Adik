import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MatchStatus } from 'src/enums/MatchStatus';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Match {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  matchedUserId: string;

  @Field()
  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  static: MatchStatus;
}
