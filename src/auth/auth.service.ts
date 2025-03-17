import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../enums/Role.js';
import { AuthJwtPayload } from './types/auth-jwt-payload.js';
import { SignInInput } from './dto/signInInput.js';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { AuthPayload } from './entities/auth-payload.js';
import * as process from 'node:process';
import { CreateUsersInput } from '../users/dto/create-users.input.js';
import { Users } from '../entities/users.entity.js';

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClient;

  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string,
    );
    console.log('Supabase client initialized:', this.supabase); // Debugging log
  }

  async registerUser({ username, email, role, password }: CreateUsersInput) {
    const { data, error } = await this.supabase.auth.signUp({
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
      id: data.user?.id,
      username,
      email,
      password,
      role: role,
      supabaseUserId: data.user?.id,
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
      id: fullUser.supabaseUserId.toString(),
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

    if (error || !data || !data.user) {
      console.error('Authentication failed due to error:', error);
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

    const payload = { sub: user.id, email: user.email, role: Role.USER };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return {
      userId: user.id.toString(),
      email: user.email,
      role: Role.USER,
      accessToken,
      message: 'Logged in Successfully.',
    };
  }

  async loginUserWithSupabase(
    email: string,
    password: string,
  ): Promise<AuthPayload> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Error logging in with Supabase:', error);
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log('Logged in', data);

    const { data: session, error: sessionError } =
      await this.supabase.auth.getSession();

    if (sessionError || !session.session) {
      console.error('Error fetching session:', sessionError);
      throw new UnauthorizedException('Session retrieval failed');
    }

    const supabaseAccessToken = session.session?.access_token;
    const supabaseUser = session.session?.user;

    return {
      userId: supabaseUser.id.toString(),
      email: email,
      role: Role.USER,
      accessToken: supabaseAccessToken,
      message: 'Logged in Successfully.',
    };
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      console.error('Supabase client is not initialized.');
    }
    return this.supabase;
  }
}
