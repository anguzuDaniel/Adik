import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsersInput } from '../users/dto/create-users.input';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Role } from '../enums/Role';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { AuthPayload } from './entities/auth-payload';
import { Users } from '../entities/users.entity';
import { SignInInput } from './dto/signInInput';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(input: CreateUsersInput) {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const newUser = this.userRepo.create({
        ...input,
        password: hashedPassword,
        role: Role.USER,
      });

      const savedUser = await this.userRepo.save(newUser);

      return this.login(savedUser);
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError === '23505') {
        throw new UnauthorizedException('User with this email already exists');
      }
      throw e;
    }
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.userRepo.findOneByOrFail({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
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

  login(user: Users): AuthPayload {
    const { accessToken } = this.generateToken(user.id);

    return {
      userId: user.id,
      role: user.role,
      accessToken,
      message: 'Login successful',
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
