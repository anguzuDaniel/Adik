import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from './gql-auth.guard';
import { UserService } from '../../user/user.service';
import { CreateUserInput } from '../../user/dto/create-user.input';

@Resolver(() => CreateUserInput)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [CreateUserInput])
  users() {
    return this.usersService.findAll();
  }

  @Mutation(() => CreateUserInput)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<CreateUserInput> {
    return this.usersService.create(createUserInput);
  }
}
