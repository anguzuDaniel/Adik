import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUsersInput } from './dto/create-users.input';
import { UpdateUsersInput } from './dto/update-users.input';
import { Users } from '../entities/users.entity';
import { GqlAuthGuard } from '../auth/dto/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Users)
  @ApiOperation({ summary: 'Create a users.' })
  createUser(@Args('createUserInput') createUserInput: CreateUsersInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Users], { name: 'user' })
  @ApiOperation({ summary: 'Find all users' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Users, { name: 'user' })
  @ApiOperation({ summary: 'Find one users' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Users)
  @ApiOperation({ summary: 'Update users' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUsersInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Users)
  @ApiOperation({ summary: 'Remove users' })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
