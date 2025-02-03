import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import e from 'express';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import * as process from 'node:process';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor() {
    super({
      supabaseUrl: process.env.SUPABASE_DATABASE_URL as string,
      supabaseKey: process.env.SUPABASE_KEY as string,
      supabaseOptions: {},
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: any): any {
    return super.validate(payload);
  }

  authenticate(
    req: e.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ) {
    super.authenticate(req);
  }
}
