import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/Role';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@ObjectType()
@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Field()
  @IsString()
  @MinLength(1)
  @Column()
  password: string;
}
