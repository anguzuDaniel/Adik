import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteMessagesResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
