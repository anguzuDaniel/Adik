import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';
import { UsersService } from '../../users/users.service';
import { CreateUsersInput } from '../../users/dto/create-users.input';

@Resolver(() => CreateUsersInput)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [CreateUsersInput])
  users() {
    return this.usersService.findAll();
  }

  @Mutation(() => CreateUsersInput)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUsersInput,
  ): Promise<CreateUsersInput> {
    return this.usersService.create(createUserInput);
  }
}
