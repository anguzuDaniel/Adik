import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import e from 'express';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import * as process from 'node:process';
import { AuthService } from './auth.service.js';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(private readonly authService: AuthService) {
    super({
      supabaseUrl: process.env.SUPABASE_URL as string,
      supabaseKey: process.env.SUPABASE_JWT_SECRET as string,
      supabaseOptions: {},
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('Decoded payload:', payload);

    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token or missing userId');
    }

    const supabase = this.authService.getClient();

    const { data: user, error } = await supabase.auth.admin.getUserById(
      String(payload.sub),
    );

    if (error || !user) {
      throw new UnauthorizedException('User not found');
    }

    console.log('Authenticated user:', user);

    return user;
  }

  async authenticate(
    req: e.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ) {
    if (!req.headers.authorization) {
      return this.fail('No authorization header found', 401);
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      return this.fail('No authorization header found', 401);
    }

    try {
      const supabase = this.authService.getClient();

      if (!supabase || !supabase.auth) {
        return this.fail('Internal server error', 500);
      }

      // Use getUser for token validation
      const { data: user, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        console.error('Error authenticating user:', error);
        return this.fail('Invalid token or user not found', 401);
      }

      console.log('User:', user);
      console.error('Error:', error);

      req.user = user;

      this.success(user, 200);
    } catch (error) {
      console.error('Error during authentication process:', error);
      return this.fail('Authentication failed', 500);
    }
  }
}
