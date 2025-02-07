import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signInInput';
import { CreateUsersInput } from '../users/dto/create-users.input';
import { AuthPayload } from './entities/auth-payload';
import { Users } from '../entities/users.entity';
import { GqlAuthGuard } from './dto/gql-auth.guard';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';

/**
 * Write comments
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Users, { name: 'viewer' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: SupabaseAuthUser) {
    return user;
  }

  @Mutation(() => Users)
  signUp(
    @Args({ name: 'input', type: () => CreateUsersInput })
    input: CreateUsersInput,
  ) {
    return this.authService.registerUser(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: SignInInput): Promise<AuthPayload> {
    const user = await this.authService.validateLocalUser(input);
    return this.authService.login(user);
  }
}
