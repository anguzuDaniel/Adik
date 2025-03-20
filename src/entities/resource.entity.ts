import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ResourceType } from '../enums/ResourceType.js';

@ObjectType()
@Entity()
export class Resource {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.ARTICLE,
  })
  type: ResourceType;

  @Field()
  @Column()
  url: string;
}
