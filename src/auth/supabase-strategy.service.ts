import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import e from 'express';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import * as process from 'node:process';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      supabaseUrl: process.env.SUPABASE_URL as string,
      supabaseKey: (process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) as string,
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
      supabaseOptions: {
        auth: {
          autoRefreshToken: true,
          persistSession: false,
        },
      },
    });
  }

  async validate(payload: any): Promise<any> {
    const supabase = this.authService.getClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.admin.getUserById(String(payload.sub));

    if (error || !user) {
      throw new UnauthorizedException('User not found');
    }

    return await this.usersService.findOrCreateFromSupabase({
      id: user.id,
      email: user.email!,
      metadata: user.user_metadata,
    });
  }

  async authenticate(
    req: e.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ) {
    const supabase = this.authService.getClient();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      return this.fail({ message: 'Authorization header missing' }, 401);
    }

    try {
      console.log('[Auth] Validating token...');
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        console.error('[Auth] Token validation failed:', error?.message || 'No user returned');
        return this.fail({ message: 'Invalid token' }, 401);
      }

      console.log('[Auth] Token valid for user:', user.id, user.email);

      // Auto-create local user record if it doesn't exist yet
      const localUser = await this.usersService.findOrCreateFromSupabase({
        id: user.id,
        email: user.email!,
        metadata: user.user_metadata,
      });

      console.log('[Auth] Local user found/created:', localUser?.id, localUser?.email);
      this.success(localUser, {});
    } catch (error: any) {
      console.error('[Auth] Unexpected error in authenticate:', error?.message, error);
      this.error(error);
    }
  }

  private extractTokenFromHeader(
    req: e.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
