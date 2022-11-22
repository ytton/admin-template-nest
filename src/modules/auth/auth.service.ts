import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import User from '../user/entities/user.entity';
import { Status } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
      include: {
        roles: true,
      },
    });

    if (!user) throw new NotFoundException('用户名或密码错误');
    const verifyResult = await argon2.verify(user.password, loginDto.password);
    if (!verifyResult) throw new BadRequestException('用户名或密码错误');

    if (user.status === Status.disable) {
      throw new ForbiddenException('用户已冻结');
    }
    return {
      user: new User(user),
      accessToken: await this.token(user),
    };
  }

  //后续完善注册功能，这里的注册是1号管理员注册
  async register(registerDto: RegisterDto) {
    const password = await argon2.hash(registerDto.password);
    const isRegistered = await this.prisma.user.count({
      where: { id: this.config.get<number>('app.superAdminId') ?? 1 },
    });
    if (!!isRegistered) {
      throw new ForbiddenException('未有该权限');
    }
    const user = this.prisma.user.create({
      data: {
        ...registerDto,
        password,
        roles: {
          connectOrCreate: [
            {
              where: {
                id: 1,
              },
              create: {
                name: 'superAdmin',
              },
            },
          ],
        },
      },
    });

    return omit(user, ['password']);
  }

  async token(user: User) {
    return await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    });
  }
}
