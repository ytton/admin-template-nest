import { PrismaClient } from '@prisma/client';
import initUser from './user';
export default async (prisma: PrismaClient) => {
  await prisma.role.create({
    data: {
      name: 'root',
      perms: {
        connect: [
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          //
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          //
          { id: 12 },
          { id: 13 },
          { id: 14 },
          { id: 15 },
          //
          { id: 17 },
          { id: 18 },
          { id: 19 },
          { id: 20 },
        ],
      },
    },
  });
  initUser(prisma);
};
