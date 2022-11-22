import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
//表字段不存在，通常用于查询单条和删除
export function IsNotExists(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();
          const where = {
            [args.property]: value,
            id: object,
          };
          if ((<any>args.object).id) {
            where.id = {
              not: (<any>args.object).id,
            };
          }
          const res = await prisma[table].findFirst({
            where,
          });
          return !Boolean(res);
        },
      },
    });
  };
}
