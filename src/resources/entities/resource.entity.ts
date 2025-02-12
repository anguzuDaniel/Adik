import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class Resource {
  @ApiProperty()
  @Field(() => Int)
  id: number;

  @ApiProperty()
  @Field()
  title: string;


}
