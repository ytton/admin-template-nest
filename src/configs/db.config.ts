import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  URL: process.env.DATABASE_URL,
}));
