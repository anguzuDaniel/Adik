import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteCommunityResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field()
  communityId: string;
}