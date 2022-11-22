import { Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
export default class BaseEntity<T> {
  @Expose()
  id: number;
  @Expose()
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  createdAt: Date;
  @Expose()
  @Transform(({ value }) => (value ? dayjs(value).format('YYYY-MM-DD') : ''))
  updatedAt: Date;
  // @Expose()
  // @Transform(({ value }) => value ?? '<unknown>')
  // createdBy: string;
  // @Expose()
  // @Transform(({ value }) => value ?? '<unknown>')
  // updatedBy: string;

  constructor(partial: Partial<BaseEntity<T>> = {}) {
    Object.assign(this, partial);
  }
}
