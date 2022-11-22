import { Status } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExists } from 'src/common/rules/is-exists.validate';

export class CreateRoleDto {
  @Expose()
  @IsNotEmpty({ message: '角色名不能为空' })
  @IsExists('role', { message: '角色名已存在' })
  name: string;
  @Expose()
  status: Status = Status.enable;
  @Expose()
  @IsOptional()
  permIds?: number[];
}
