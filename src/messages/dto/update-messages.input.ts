import { CreateMessagesInput } from './create-messages.input.js';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class UpdateMessagesInput extends PartialType(CreateMessagesInput) {
  @ApiProperty()
  @Field(() => ID)
  id: string;

  @ApiProperty()
  @IsString()
  @Field()
  content: string;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  senderId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: string;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  receiverId: string;
}
