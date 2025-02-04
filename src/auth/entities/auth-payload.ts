import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../../enums/Role';

@ObjectType()
export class AuthPayload {
  @Field(() => Int)
  userId: number;

  @Field(() => Role)
  role: Role;

  @Field()
  accessToken: string;

  @Field({ nullable: true })
  message: string;
}
