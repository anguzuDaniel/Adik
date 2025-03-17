import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { SignInInput } from './dto/signInInput.js';
import { AuthPayload } from './entities/auth-payload.js';
import { Users } from '../entities/users.entity.js';
import { GqlAuthGuard } from './dto/gql-auth.guard.js';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Users, { name: 'viewer' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: SupabaseAuthUser) {
    return user;
  }

  @Mutation(() => AuthPayload)
  signUp(
    @Args({ name: 'input' }) input: SignInInput,
  ): Promise<AuthPayload> {
    return this.authService.registerUser(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: SignInInput): Promise<AuthPayload> {
    const user = await this.authService.validateLocalUser(input);

    if (!user || !user.email) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return this.authService.loginUserWithSupabase(input.email, input.password);
  }
}
