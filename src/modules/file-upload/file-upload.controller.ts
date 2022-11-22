import { Controller, Post, Req } from '@nestjs/common';
import { NoAuth } from 'src/common/decorators/no-auth.decorator';
import { Image } from './upload';
@Controller('upload')
export class FileUploadController {
  @Post('image')
  @Image()
  @NoAuth('need jwt')
  image(@Req() req) {
    return req.file;
  }
}
