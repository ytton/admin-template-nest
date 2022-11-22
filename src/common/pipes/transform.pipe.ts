import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value: any, { metatype, type }: ArgumentMetadata) {
    if (type !== 'body') return plainToClass(metatype, value);
    const res = plainToClass(metatype, value, { excludeExtraneousValues: true, exposeUnsetFields: false });
    return res;
  }
}
