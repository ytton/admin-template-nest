import { Method } from '@prisma/client';
import BaseEntity from 'src/modules/prisma/base.entity';

export class Perm extends BaseEntity<Perm> {
  name: string;
  url: string | null;
  method: Method | null;
  entityId: number | null;
  perms: Perm[];
}
