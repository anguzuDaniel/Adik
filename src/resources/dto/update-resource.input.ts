import { CreateResourceInput } from './create-resource.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { ResourceType } from '../../enums/ResourceType';

@InputType()
export class UpdateResourceInput extends PartialType(CreateResourceInput) {
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
