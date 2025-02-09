import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../enums/Role';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { SignInInput } from './dto/signInInput';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { AuthPayload } from './entities/auth-payload';
import { Users } from 'src/entities/users.entity';
import * as process from 'node:process';
import { CreateUsersInput } from '../users/dto/create-users.input';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string,
    );
  }

  async registerUser({ username, email, role, password }: CreateUsersInput) {
    const { error } = await this.supabase.auth.signUp({
      phone: '',
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: { email_confirm: true },
      },
    });

    if (error) {
      throw new ConflictException('User with this email may already exist');
    }

    const { error: insertError } = await this.supabase.from('users').insert({
      username,
      email,
      password,
      role: role,
    });

    if (insertError) {
      throw new Error(
        `Failed to insert user into users table: ${insertError.message}`,
      );
    }

    const fullUser = await this.userRepo.findOneBy({
      email: email.toLocaleLowerCase(),
    });

    if (!fullUser) {
      throw new Error('User not found after creation');
    }

    const supabaseUser: User = {
      id: fullUser.id.toString(),
      email: fullUser.email,
      app_metadata: {}, // Empty object or default data
      user_metadata: {}, // Empty object or default data
      aud: 'authenticated', // Assuming 'authenticated' is the default audience
      created_at: new Date().toISOString(), // Add a default creation date
    };

    const authPayload = this.login(supabaseUser);
    console.log('AuthPayload being returned:', authPayload);
    return authPayload;
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    // console.log('Supabase Auth Response:', { data, error }); // Debugging

    if (error || !data || !data.user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    console.log('Authenticated User:', data.user); // Debugging

    return data.user;
  }

  generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: userId,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
    });

    return { accessToken };
  }

  login(user: User): AuthPayload {
    if (!user.email) {
      throw new Error('User email is missing in login function');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      userId: user.id.toString(),
      email: user.email,
      role: Role.USER,
      accessToken,
      message: 'Logged in Successfully.',
    };
  }

  // async validateJwtUser(token: number) {
  //   try {
  //     const decoded = this.jwtService.verify(token); // Use verify to decode and validate the token
  //     return decoded;
  //   } catch (e) {
  //     throw new UnauthorizedException('Invalid or expired token');
  //   }
  // }
}
