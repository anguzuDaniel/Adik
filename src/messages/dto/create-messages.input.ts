import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
  @Field()
  senderId: string;

  @ApiProperty()
  @IsString()
  @Field(() => Int)
  receiverId: string;
}
