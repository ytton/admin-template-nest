import { PrismaClient } from '@prisma/client';
import initDb from './perm'
const prisma = new PrismaClient();

initDb(prisma)