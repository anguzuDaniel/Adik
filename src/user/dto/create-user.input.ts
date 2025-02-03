import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../enums/Role';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateUserInput {
  @ApiProperty()
  @IsString()
  @Field()
  username: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @ApiProperty()
  @IsEnum(Role)
  @Field(() => Role)
  role: Role;

  @ApiProperty()
  @Field()
  @IsString()
  @MinLength(3)
  password: string;
}
