import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { omit } from 'lodash';
import User from './entities/user.entity';
import { BaseQueryDto } from '../prisma/dto/base-query.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService<User>) {}

  async create(createUserDto: CreateUserDto) {
    const password = await argon2.hash(createUserDto.password);
    createUserDto.password = password;

    return this.prisma.create(User, createUserDto);
  }

  findAll(query: BaseQueryDto) {
    return this.prisma.findAll(User, query);
  }

  findOne(id: number) {
    return this.prisma.findOne(User, id, { roles: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.update(User, id, updateUserDto);
  }

  remove(id: number) {
    return this.prisma.remove(User, id);
  }
}
