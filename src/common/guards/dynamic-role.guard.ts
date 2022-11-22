import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Role } from 'src/modules/role/entities/role.entity';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService<Role>,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isNoAuth = this.reflector.get<string | boolean>('isNoAuth', context.getHandler());
    if (isNoAuth === true) return true;
    //认证结果
    const res = await super.canActivate(context);
    if (!res) return false;
    const { user, method, path } = context.switchToHttp().getRequest();
    if (!user) return false;
    //noAuth只需要认证不需要鉴权的API
    if (isNoAuth === 'need jwt') {
      return true;
    }
    //超级管理员账号
    if (user.id === this.configService.get<number>('app.superAdminId')) {
      return true;
    }
    //这里有优化空间，把查询到数据做缓存，这样不用每次每个API调用两次数据库
    const perms = await this.prisma.perm.findMany({
      where: {
        roles: {
          some: {
            id: {
              in: user.roles.map((x) => x.id),
            },
          },
        },
      },
    });

    const result = perms.some((perm) => this.matchPath(path, perm.url) && perm.method.toUpperCase() === method);
    if (!result) throw new ForbiddenException('没有该权限');
    return result;
  }
  matchPath(path: string, url: string) {
    path = path.replace('/api' + url, '');
    return !path.length || path === '/' || /\/\d+/.test(path);
  }
}
