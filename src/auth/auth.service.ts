import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from '../user/dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { Role } from '../enums/Role';
import { JwtUser } from './types/jwt-user';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { AuthPayload } from './entities/auth-payload';
import { User } from '../entities/user.entity';
import { SignInInput } from './dto/signInInput';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(input: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newUser = this.userRepo.create({
      ...input,
      password: hashedPassword,
      role: Role.USER,
    });
    return await this.userRepo.save(newUser);
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.userRepo.findOneByOrFail({ email });

    const passwordMatched = verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }

  generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: {
        userId,
      },
    };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  login(user: User): AuthPayload {
    const { accessToken } = this.generateToken(user.id);

    return {
      userId: user.id,
      role: user.role,
      accessToken,
      message: 'Login successful',
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userRepo.findOneByOrFail({ id: userId });
    const jwtUser: JwtUser = {
      userId: user.id,
      role: user.role,
    };
    return jwtUser;
  }
}
