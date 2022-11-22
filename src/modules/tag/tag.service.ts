import { Injectable } from '@nestjs/common';
import { BaseQueryDto } from '../prisma/dto/base-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import Tag from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(readonly prisma: PrismaService<Tag>) {}

  create(createTagDto: CreateTagDto) {
    return this.prisma.create(Tag, createTagDto);
  }

  findAll(query: BaseQueryDto) {
    return this.prisma.findAll(Tag, query);
  }

  findOne(id: number) {
    return this.prisma.findOne(Tag, id);
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.update(Tag, id, updateTagDto);
  }

  remove(id: number) {
    return this.prisma.remove(Tag, id);
  }
}
