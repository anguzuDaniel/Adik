import { CreateMessagesInput } from './create-messages.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class UpdateMessagesInput extends PartialType(CreateMessagesInput) {
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
