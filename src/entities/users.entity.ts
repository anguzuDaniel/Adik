import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { Role } from '../enums/Role.js';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { RecoveryStage } from '../enums/RecoveryStage.js';

@ObjectType()
@Entity()
@Unique(['username', 'email']) // Unique constraint
export class Users {
  constructor(partial?: Partial<Users>) {
    Object.assign(this, partial);
  }

  @PrimaryColumn('uuid')
  id: string;

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
  @Column({
    type: 'enum',
    enum: RecoveryStage,
    default: RecoveryStage.PRE_CONTEMPLATION,
  })
  recoveryStage: RecoveryStage;

  @Field()
  @Column()
  supabaseUserId: string;

  @Field()
  @IsString()
  @MinLength(1)
  @Column()
  password: string;
}
