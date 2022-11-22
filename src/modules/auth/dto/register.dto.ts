import { Status } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class RegisterDto {
  @Expose()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  @Expose()
  @IsOptional()
  @IsEmail({}, { message: '邮箱地址填写错误' })
  email: string;
  @Expose()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
