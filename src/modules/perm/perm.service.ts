import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermDto } from './dto/create-perm.dto';
import { UpdatePermDto } from './dto/update-perm.dto';
import { Perm } from './entities/perm.entity';

@Injectable()
export class PermService {
  constructor(private readonly prisma: PrismaService<Perm>) {}

  create(createPermDto: CreatePermDto) {
    if (createPermDto.entityId) {
      if (!createPermDto.url || !createPermDto.method) {
        throw new BadRequestException('权限必须含有url和method');
      }
    }
    return this.prisma.create(Perm, createPermDto);
  }

  findAll() {
    return this.prisma.perm.findMany({
      where: {
        entityId: null,
      },
      include: {
        perms: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.findOne(Perm, id, { perms: true });
  }

  update(id: number, updatePermDto: UpdatePermDto) {
    return this.prisma.update(Perm, id, updatePermDto);
  }

  async remove(id: number) {
    //判断是否是实体，且关联的权限是否为空
    const entity = await this.findOne(id);
    if (!entity.entityId && entity.perms.length) {
      throw new BadRequestException('删除的实体权限必须为空');
    }
    return this.prisma.remove(Perm, id);
  }
}
