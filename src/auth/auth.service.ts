import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsersInput } from '../users/dto/create-users.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../enums/Role';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { SignInInput } from './dto/signInInput';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { AuthPayload } from './entities/auth-payload';
import { Users } from 'src/entities/users.entity';

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

  async registerUser({ email, password }: CreateUsersInput) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new ConflictException('User with this email may already exist');
    }

    await this.supabase.from('users').insert({
      email,
      role: Role.USER,
    });

    const fullUser = await this.userRepo.findOne({ where: { email } });

    if (!fullUser) {
      throw new Error('User not found creation');
    }

    const supabaseUser: User = {
      id: fullUser.id.toString(),
      email: fullUser.email,
      app_metadata: {}, // Empty object or default data
      user_metadata: {}, // Empty object or default data
      aud: 'authenticated', // Assuming 'authenticated' is the default audience
      created_at: new Date().toISOString(), // Add a default creation date
    };

    return this.login(supabaseUser);
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return data.user;
  }

  generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: userId,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    return { accessToken };
  }

  login(user: User): AuthPayload {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      userId: user.id,
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
