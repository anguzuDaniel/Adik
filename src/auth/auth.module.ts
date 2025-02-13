import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { SupabaseStrategy } from './supabase-strategy.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity.js';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { UsersModule } from '../users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './dto/gql-auth.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
      },
    }),
  ],
  providers: [AuthService, AuthResolver, SupabaseStrategy, GqlAuthGuard],
  exports: [AuthService, SupabaseStrategy, GqlAuthGuard],
})
export class AuthModule {}
