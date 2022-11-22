import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  isDev: process.env.NODE_ENV === 'development',
  superAdminId: 1,
}));
