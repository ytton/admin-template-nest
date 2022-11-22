import { Method } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsExists } from 'src/common/rules/is-exists.validate';
export class CreatePermDto {
  @Expose()
  @IsNotEmpty({ message: ({ object }) => ((<any>object).entityId ? '权限名不能为空' : '实体名不能为空') })
  @IsExists('perm', { message: ({ object }) => ((<any>object).entityId ? '权限名已经存在' : '实体名已经存在') })
  name: string;
  @Expose()
  url: string;
  @Expose()
  method: Method;
  @Expose()
  entityId: number;
}
