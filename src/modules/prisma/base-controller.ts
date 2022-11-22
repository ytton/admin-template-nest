import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConstructorOf } from 'src/common/types';
import { BaseQueryDto } from '../prisma/dto/base-query.dto';
import { PrismaService } from './prisma.service';

@Controller('base')
export class BaseController<Entity = any> {
  entity: ConstructorOf<Entity>;
  constructor(entity: ConstructorOf<Entity>, private readonly prismaService: PrismaService<Entity>) {
    this.entity = entity;
    this.prismaService = prismaService;
  }

  //更新和创建是等待子类重写，要不然获取不到正确的dto验证
  @Post()
  create(@Body() createBaseDto: object) {
    throw new Error('请手动实现该方法');
    return this.prismaService.create(this.entity, createBaseDto);
  }

  @Get()
  findAll(@Query() query: BaseQueryDto) {
    return this.prismaService.findAll(this.entity, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prismaService.findOne(this.entity, +id);
  }
  //更新和创建是等待子类重写，要不然获取不到正确的dto验证
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: object) {
    throw new Error('请手动实现该方法');
    return this.prismaService.update(this.entity, +id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prismaService.remove(this.entity, +id);
  }
}
