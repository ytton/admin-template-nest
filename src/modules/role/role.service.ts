import { Injectable } from '@nestjs/common';
import { BaseQueryDto } from '../prisma/dto/base-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService<Role>) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.create(Role, createRoleDto);
  }

  findAll(query: BaseQueryDto) {
    return this.prisma.findAll(Role, query);
  }

  findOne(id: number) {
    return this.prisma.findOne(Role, id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.update(Role, id, updateRoleDto);
  }

  remove(id: number) {
    return this.prisma.remove(Role, id);
  }
}
