import { SetMetadata } from '@nestjs/common';

export function NoAuth(type?: 'need jwt') {
  return SetMetadata('isNoAuth', type ?? true);
}
