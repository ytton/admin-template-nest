import BaseEntity from 'src/modules/prisma/base.entity';

export default class Tag extends BaseEntity<Tag> {
  name: string;
}
