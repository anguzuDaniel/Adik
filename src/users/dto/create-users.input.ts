import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../enums/Role.js';
import { ApiProperty } from '@nestjs/swagger';
import { RecoveryStage } from '../../enums/RecoveryStage.js';

@InputType()
export class CreateUsersInput {
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
  @IsEnum(Role)
  @Field(() => RecoveryStage)
  recoveryStage: RecoveryStage;
}
