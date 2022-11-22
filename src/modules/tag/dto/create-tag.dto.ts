import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsExists } from 'src/common/rules/is-exists.validate';

export class CreateTagDto {
  @Expose()
  @IsNotEmpty({ message: '标签名不能为空' })
  @IsExists('tag', { message: '标签名已存在' })
  name: string;
}
