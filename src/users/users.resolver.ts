import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
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

  @Mutation(() => Users)
  @ApiOperation({ summary: 'Create a users.' })
  @UseGuards(GqlAuthGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUsersInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [Users], { name: 'user' })
  @ApiOperation({ summary: 'Find all users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => Users, { name: 'user' })
  @ApiOperation({ summary: 'Find one users' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => Users)
  @ApiOperation({ summary: 'Update users' })
  @UseGuards(GqlAuthGuard)
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
