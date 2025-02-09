import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Role } from '../../enums/Role';

@ObjectType()
export class AuthPayload {
  @Field(() => ID)
  userId: string;

  @Field({ nullable: true })
  username?: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  @Field()
  accessToken: string;

  @Field({ nullable: true })
  message: string;
}
