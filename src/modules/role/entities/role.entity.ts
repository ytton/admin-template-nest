import { Perm } from 'src/modules/perm/entities/perm.entity';
import BaseEntity from 'src/modules/prisma/base.entity';

export class Role extends BaseEntity<Role> {
  name: string;
  perms?: Perm[];
}
