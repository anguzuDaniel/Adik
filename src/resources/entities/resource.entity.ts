import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Resource {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
