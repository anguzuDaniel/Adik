import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '../../enums/ResourceType';
import { Column } from 'typeorm';

@ObjectType()
export class Resource {
  @ApiProperty()
  @Field(() => Int)
  @Column()
  id: number;

  @ApiProperty()
  @Field()
  @Column()
  title: string;

  @ApiProperty()
  @Field()
  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.ARTICLE,
  })
  type: ResourceType;

  @ApiProperty()
  @Field()
  @Column()
  url: string;
}
