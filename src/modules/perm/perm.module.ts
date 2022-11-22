import { Module } from '@nestjs/common';
import { PermService } from './perm.service';
import { PermController } from './perm.controller';

@Module({
  controllers: [PermController],
  providers: [PermService],
})
export class PermModule {}
