import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signInInput';
import { CreateUsersInput } from '../users/dto/create-users.input';
import { AuthPayload } from './entities/auth-payload';
import { Users } from '../entities/users.entity';

/**
 * Write comments
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Users)
  signUp(
    @Args({ name: 'input', type: () => CreateUsersInput })
    input: CreateUsersInput,
  ) {
    return this.authService.registerUser(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: SignInInput) {
    const user = await this.authService.validateLocalUser(input);
    return this.authService.login(user);
  }
}
