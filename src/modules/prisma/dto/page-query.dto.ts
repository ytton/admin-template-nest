import { Expose, Transform } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class PageQuery {
  @Expose()
  @IsOptional()
  @IsNumberString(undefined, { message: '页码必须是数字' })
  @Transform(({ value }) => value ?? '1')
  _page?: number;
  @Expose()
  @IsOptional()
  @IsNumberString(undefined, { message: '页码数必须是数字' })
  @Transform(({ value }) => value ?? '10')
  _size?: number;
}
