import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

export default async (prisma: PrismaClient) => {
  await prisma.user.create({
    data: {
      username: 'root',
      password: await hash('123456aa'),
      roles: {
        connect: [{ id: 1 }],
      },
    },
  });
  console.log('初始化数据成功');
  console.log('=====================');
  console.log('用户名: root');
  console.log('密码: 123456aa');
  console.log('=====================');
};
