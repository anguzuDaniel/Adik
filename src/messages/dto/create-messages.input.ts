import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateMessagesInput {
  @ApiProperty()
  @Field(() => Int)
  id: number;

  @ApiProperty()
  @IsString()
  @Field()
  content: string;

  @ApiProperty()
  @IsString()
  @Field(() => Int)
  senderId: number;

  // Replying to message
  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: number;

  @ApiProperty()
  @IsString()
  @Field(() => Int)
  receiverId: number;
}
