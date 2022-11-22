import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { BaseController } from '../prisma/base-controller';
import Tag from './entities/tag.entity';

@Controller('tag')
export class TagController extends BaseController<Tag> {
  constructor(private readonly tagService: TagService) {
    super(Tag, tagService.prisma);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }
}
