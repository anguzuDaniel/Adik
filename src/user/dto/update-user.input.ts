import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @ApiProperty()
  @Field(() => Int)
  id: number;
}
