import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { ResourceType } from '../../enums/ResourceType';

@InputType()
export class CreateResourceInput {
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
