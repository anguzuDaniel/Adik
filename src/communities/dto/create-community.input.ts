import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCommunityInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  adminId: string;

  @Field(() => [String])
  groupTags: string[];

  @Field(() => Float)
  rating: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Int)
  memberNumber: number;
}
