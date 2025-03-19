import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCommunityInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  groupTags: string[];

  @Field(() => Float)
  rating: number;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Int)
  memberNumber: number;
}
