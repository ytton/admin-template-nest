import { Status } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, ValidateIf } from 'class-validator';
import { IsExists } from 'src/common/rules/is-exists.validate';

export class CreateUserDto {
  @Expose()
  avatar?: string;
  @Expose()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsExists('user', { message: '用户名已存在' })
  username: string;
  @Expose()
  @ValidateIf((_, value) => value)
  @IsEmail({}, { message: '邮箱地址填写错误' })
  email?: string;
  @Expose()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  @Expose()
  status: Status = Status.enable;
  @Expose()
  roleIds: number[];
}
