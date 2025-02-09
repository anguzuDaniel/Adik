import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signInInput';
import { AuthPayload } from './entities/auth-payload';
import { Users } from '../entities/users.entity';
import { GqlAuthGuard } from './dto/gql-auth.guard';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUsersInput } from '../users/dto/create-users.input';

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

  @Mutation(() => AuthPayload)
  signUp(@Args({ name: 'input' }) input: CreateUsersInput): Promise<AuthPayload> {
    return this.authService.registerUser(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: SignInInput): Promise<AuthPayload> {
    const user = await this.authService.validateLocalUser(input);

    console.log('User returned from validateLocalUser:', user);

    if (!user || !user.email) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return this.authService.login(user);
  }
}
