import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/Role';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @ApiProperty()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: Role;
}
