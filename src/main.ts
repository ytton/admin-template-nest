import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TransformPipe } from './common/pipes/transform.pipe';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //添加路由前缀
  app.setGlobalPrefix('api', {
    //排除/路由
    exclude: ['/'],
  });
  //验证管道
  app.useGlobalPipes(new ValidationPipe());
  //自定义转换管道
  app.useGlobalPipes(new TransformPipe());
  //跨域
  app.enableCors();
  //全局定义序列化拦截器
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { strategy: 'exposeAll' }));
  //静态资源
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
