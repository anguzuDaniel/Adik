import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../enums/Role.js';
import { AuthJwtPayload } from './types/auth-jwt-payload.js';
import { SignInInput } from './dto/signInInput.js';
import { JwtService } from '@nestjs/jwt';
import { QueryFailedError, Repository } from 'typeorm';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { AuthPayload } from './entities/auth-payload.js';
import * as process from 'node:process';
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
    console.log('Supabase client initialized:', this.supabase);
  }

  async registerUser({ email, password }: SignInInput): Promise<{
    userId: string;
    username?: string;
    email: string;
    role: Role;
    accessToken: string;
    message: string;
    expiresAt: number
  }> {
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

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
      const errorMessage = error.message.includes('already registered')
        ? 'Email already in use'
        : error.message;
      throw new ConflictException(errorMessage);
    }

    const baseUsername = data.user?.email?.split('@')[0]?.replace(/[^a-zA-Z0-9_]/g, '_') || 'user';
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const { error: existsError } = await this.supabase
        .from('users')
        .select()
        .eq('username', username);

      if (!existsError) break;
      username = `${baseUsername}${counter}`;
      counter++;
    }

    try {
      const { error: insertError } = await this.supabase.from('users').insert({
        id: data.user?.id,
        email: data.user?.email,
        username,
      });

      if (insertError) {
        await this.supabase.auth.admin.deleteUser(data.user?.id!);
        throw new Error(`Failed to insert user: ${insertError.message}`);
      }

      const fullUser = await this.userRepo.findOneBy({
        email: email.toLocaleLowerCase(),
      });

      if (!fullUser) {
        await this.supabase.auth.admin.deleteUser(data.user?.id!);
        throw new Error('User not found after creation');
      }

      const supabaseUser: User = {
        id: fullUser.id.toString(),
        email: fullUser.email,
        app_metadata: data.user?.app_metadata || {},
        user_metadata: data.user?.user_metadata || {},
        aud: 'authenticated',
        created_at: data.user?.created_at || new Date().toISOString(),
      };

      const authPayload = this.login(supabaseUser);
      return {
        ...authPayload,
        accessToken: data.session?.access_token || '',
        expiresAt: data.session?.expires_at || 0
      };

    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Database constraint violated');
      }
      throw error;
    }
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
