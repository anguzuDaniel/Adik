import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateMessagesInput {
  @ApiProperty()
  @IsString()
  @Field()
  content: string;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  senderId: string;

  // Replying to message
  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: number;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  receiverId: string;
}
