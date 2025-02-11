import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/Role';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@ObjectType()
@Entity()
@Unique(['username', 'email']) // Unique constraint
export class Users {
  constructor(partial?: Partial<Users>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Field()
  @Column()
  supabaseUserId: string;

  @Field()
  @IsString()
  @MinLength(1)
  @Column()
  password: string;
}
