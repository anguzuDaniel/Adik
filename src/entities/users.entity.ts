import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { Role } from '../enums/Role.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { RecoveryStage } from '../enums/RecoveryStage.js';

@ObjectType()
@Entity()
@Unique(['username', 'email']) // Unique constraint
export class Users {
  constructor(partial?: Partial<Users>) {
    Object.assign(this, partial);
  }

  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  @IsString()
  @MinLength(3)
  username: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column({
    type: 'varchar',
    default: Role.USER,
  })
  role: Role;

  @Field()
  @Column({
    type: 'varchar',
    default: RecoveryStage.PRE_CONTEMPLATION,
  })
  recoveryStage: RecoveryStage;
}
