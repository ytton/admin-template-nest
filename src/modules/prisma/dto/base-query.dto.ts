import { Expose, Transform } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class BaseQueryDto {
  q?: string;
  q_fields?: string;
  @Expose()
  @IsOptional()
  @IsNumberString(undefined, { message: '页码必须是数字' })
  @Transform(({ value }) => value ?? '1')
  _page?: string;
  @Expose()
  @IsOptional()
  @IsNumberString(undefined, { message: '页码数必须是数字' })
  @Transform(({ value }) => value ?? '10')
  _size?: string;
  _select?: string;
  _include?: string;
  _sort?: string;
  _order?: string;
}
export type QueryDto<E> = BaseQueryDto & {
  [key in keyof E as `${string & key}_${operator}`]?: boolean;
};
type operator = 'eq' | 'neq' | 'gte ' | 'gt' | 'lte' | 'lt' | 'like ' | 'in';
