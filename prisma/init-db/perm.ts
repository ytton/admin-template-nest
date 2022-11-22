import { PrismaClient } from '@prisma/client';
import initRole from './role';
const entities = {
  user: '用户',
  role: '角色',
  perm: '权限',
  tag: '标签',
};
export default async (prisma: PrismaClient) => {
  for await (const key of Object.keys(entities)) {
    await prisma.perm.create({
      data: {
        name: key,
        perms: {
          createMany: {
            data: [
              { name: `查询${entities[key]}`, method: 'GET', url: `/${key}` },
              { name: `增加${entities[key]}`, method: 'POST', url: `/${key}` },
              { name: `编辑${entities[key]}`, method: 'PATCH', url: `/${key}` },
              { name: `删除${entities[key]}`, method: 'DELETE', url: `/${key}` },
            ],
          },
        },
      },
    });
  }
  initRole(prisma);
};
