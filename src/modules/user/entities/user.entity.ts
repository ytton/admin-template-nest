import { Status } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { Role } from 'src/modules/role/entities/role.entity';
import BaseEntity from 'src/modules/prisma/base.entity';
export default class User extends BaseEntity<User> {
  avatar?: string;
  username: string;
  email: string | null;
  status: Status;
  @Exclude()
  password: string;
  @Transform(({ value }) => value.map((role) => ({ id: role.id, name: role.name })))
  roles: Role[];
}
