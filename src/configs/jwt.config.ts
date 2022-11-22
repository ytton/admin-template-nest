import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  tokenSecret: 'yton112233',
  expiresIn: '300d',
}));
