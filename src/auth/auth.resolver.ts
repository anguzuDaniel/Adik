import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signInInput';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthPayload } from './entities/auth-payload';
import { User } from '../entities/user.entity';

/**
 * Write comments
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(
    @Args({ name: 'input', type: () => CreateUserInput })
    input: CreateUserInput,
  ) {
    return this.authService.registerUser(input);
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('input') input: SignInInput) {
    const user = await this.authService.validateLocalUser(input);
    return this.authService.login(user);
  }
}
