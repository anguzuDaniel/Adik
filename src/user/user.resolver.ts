import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '../entities/user.entity';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @ApiOperation({ summary: 'Create a user.' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  @ApiOperation({ summary: 'Find all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @ApiOperation({ summary: 'Find one user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @ApiOperation({ summary: 'Remove user' })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
