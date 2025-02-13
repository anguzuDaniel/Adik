import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard.js';
import { UsersService } from '../../users/users.service.js';
import { CreateUsersInput } from '../../users/dto/create-users.input.js';

@Resolver(() => CreateUsersInput)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [CreateUsersInput])
  @UseGuards(GqlAuthGuard)
  users() {
    return this.usersService.findAll();
  }

  @Mutation(() => CreateUsersInput)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUsersInput,
  ): Promise<CreateUsersInput> {
    return this.usersService.create(createUserInput);
  }
}
