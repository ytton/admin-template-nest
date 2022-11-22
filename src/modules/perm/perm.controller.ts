import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermService } from './perm.service';
import { CreatePermDto } from './dto/create-perm.dto';
import { UpdatePermDto } from './dto/update-perm.dto';

@Controller('perm')
export class PermController {
  constructor(private readonly permService: PermService) {}

  @Post()
  create(@Body() createPermDto: CreatePermDto) {
    return this.permService.create(createPermDto);
  }

  @Get()
  findAll() {
    return this.permService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermDto: UpdatePermDto) {
    return this.permService.update(+id, updatePermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permService.remove(+id);
  }
}
