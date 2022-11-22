import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { map } from 'lodash';
import { QUERY_INTEGER_OP_MAP, QUERY_OP_MAP } from 'src/common/constants/queryOperatorMap';
import { ConstructorOf } from 'src/common/types';
import { QueryDto } from './dto/base-query.dto';
import { plural } from 'pluralize';

@Injectable()
export class PrismaService<Entity = any> extends PrismaClient {
  constructor(configService: ConfigService) {
    //输出查询SQL等LOG
    super(configService.get('app.isDev') ? { log: ['query', 'info', 'warn', 'error'] } : undefined);
  }
  async create(entityCtor: ConstructorOf<Entity>, createDto: object): Promise<Entity> {
    const entityName: string = entityCtor.name.replace(/^\w/, (f) => f.toLowerCase());

    const data = this.formatDto(createDto);
    const res = await this[entityName].create(data);

    return new entityCtor(res);
  }

  async findAll(entityCtor: ConstructorOf<Entity>, query: QueryDto<Entity>) {
    const entityName: string = entityCtor.name.replace(/^\w/, (f) => f.toLowerCase());

    const realQuery = this.formatQuery(query);
    const list = await this[entityName].findMany(realQuery);
    const total = await this[entityName].count({
      where: realQuery.where ?? {},
    });

    return {
      meta: {
        total: total,
        page: +query._page,
      },
      data: map(list, (entity) => new entityCtor(entity)),
    };
  }

  async findOne(entityCtor: ConstructorOf<Entity>, id: number, include?: { [x in keyof Entity]?: boolean }) {
    const entityName: string = entityCtor.name.replace(/^\w/, (f) => f.toLowerCase());
    const entity = await this[entityName].findUnique({ where: { id }, include: include });
    if (!entity) {
      throw new NotFoundException('未找到相关资源');
    }
    return new entityCtor(entity);
  }

  async update(entityCtor: ConstructorOf<Entity>, id: number, updateDto: object) {
    const entityName: string = entityCtor.name.replace(/^\w/, (f) => f.toLowerCase());

    const data = this.formatDto(updateDto, true);

    const res = await this[entityName].update({
      where: { id },
      ...data,
    });

    return new entityCtor(res);
  }

  async remove(entityCtor: ConstructorOf<Entity>, id: number) {
    const entityName: string = entityCtor.name.replace(/^\w/, (f) => f.toLowerCase());
    try {
      const res = await this[entityName].delete({
        where: { id },
      });
      return new entityCtor(res);
    } catch (error) {
      throw new BadRequestException('删除的资源不存在');
    }
  }

  formatQuery(queryDto: QueryDto<Entity>) {
    const res: any = {
      skip: (+queryDto._page - 1) * +queryDto._size,
      take: +queryDto._size,
      where: {
        OR: [{}],
      },
    };
    let order = [];
    const qFields = queryDto.q_fields?.split(',') ?? ['id'];
    delete queryDto.q_fields;
    Object.keys(queryDto).forEach((key) => {
      if (key === 'q') {
        res.where.OR.push(Object.fromEntries(qFields.map((key) => [key, { contains: queryDto.q }])));
      } else if (/^_\w+/.test(key)) {
        return;
      } else if (key.includes('_')) {
        const [field, op] = key.split('_');
        const value = op in QUERY_INTEGER_OP_MAP ? +queryDto[key] : queryDto[key];
        res.where.OR[0][field] = {
          [QUERY_OP_MAP[op] ?? op]: value,
        };
      } else {
        res.where.OR[0][key] = queryDto[key];
      }
    });
    if (queryDto._select) {
      res.select = queryDto._select.split(',');
    }
    if (queryDto._order) {
      order = queryDto._order.split(',');
    }
    if (queryDto._sort) {
      res.orderBy = queryDto._sort.split(',').map((key, i) => ({ [key]: order[i] ?? 'asc' }));
    }
    if (queryDto._include) {
      res.include = Object.fromEntries(queryDto._include.split(',').map((key) => [key, true]));
    }
    if (!queryDto.q) {
      res.where = res.where.OR[0];
    }
    return res;
  }

  formatDto(dto: object, update = false) {
    const data = {};
    const relationOne = {};
    const relationMany = {};
    let include: object = null;
    Object.keys(dto ?? {}).forEach((key) => {
      // if (/Id$/.test(key)) {
      //   const referName = key.slice(0, -2);
      //   relationOne[referName] = { set: { id: dto[key] } };
      //   include[referName] = true;
      // } else
      if (/Ids$/.test(key) && Array.isArray(dto[key])) {
        const referName = plural(key.slice(0, -3));
        relationMany[referName] = { [['connect', 'set'][+update]]: dto[key].map((x) => ({ id: x })) };
        include ??= {};
        include[referName] = true;
      } else {
        data[key] = dto[key];
      }
    });
    const res = {
      data: {
        ...data,
        ...relationOne,
        ...relationMany,
      },
      include,
    };
    if (!include) {
      delete res.include;
    }
    console.log(res);
    return res;
  }
}
