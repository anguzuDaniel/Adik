import { CreateUsersInput } from './create-users.input.js';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/Role.js';

@InputType()
export class UpdateUsersInput extends PartialType(CreateUsersInput) {
  @ApiProperty()
  @Field(() => String)
  id: string;

  @ApiProperty()
  @Field({ nullable: true })
  email?: string;

  @ApiProperty()
  @Field({ nullable: true })
  password?: string;

  @ApiProperty()
  @Field({ nullable: true })
  role?: Role;
}
