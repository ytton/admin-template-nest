import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { TagModule } from './modules/tag/tag.module';
import config from './configs';
import { PrismaService } from './modules/prisma/prisma.service';
import { PermModule } from './modules/perm/perm.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { RolesGuard } from './common/guards/dynamic-role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    PrismaModule,
    RoleModule,
    AuthModule,
    UserModule,
    TagModule,
    PermModule,
    FileUploadModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
