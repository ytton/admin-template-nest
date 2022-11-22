## Description

一个使用[Nest](https://github.com/nestjs/nest)框架的通用后台API模板项目，基于角色的权限管理，采用Restful风格API，该项目的主旨是为前端开发人员提供一个相对友好的后端项目模板，让前端在自学项目或自主开发项目时，能更关注前端功能的实现。

前端部分搭配[yton-admin-template](https://github.com/ytton/yton-admin-template)使用

## Installation

```bash
$ pnpm install
```

## Initial projection

1. `.env.exmaple`改为`.env`且配置`mysql`数据连接地址

2. 根据实际需求修改`/src/config`中的配置文件

3. 初始化数据数据

   ```bash
   npm run init-db
   ```

## Run

```bash
npm run start:dev
```

## Directory structure

```bash
yton-admin-nest                                                    
├─ prisma    #prisma相关配置                              
│  ├─ init-db  #重置数据库种子数据                            
│  │  ├─ index.ts                          
│  │  ├─ perm.ts                           
│  │  ├─ role.ts                           
│  │  └─ user.ts                           
│  ├─ migrations  #数据库迁移                                      
│  └─ schema.prisma  #配置数据库实体                      
├─ src                                     
│  ├─ common #全局通用内容                              
│  │  ├─ constants                               
│  │  ├─ decorators                                     
│  │  ├─ filters                           
│  │  ├─ guards                                     
│  │  ├─ interceptors                      
│  │  ├─ pipes                                        
│  │  ├─ rules                                 
│  │  ├─ types                                                 
│  │  └─ utils                             
│  ├─ configs #项目配置相关                                                              
│  ├─ modules #实际模块                             
│  │  ├─ auth  #认证相关                                           
│  │  ├─ file-upload                                            
│  │  ├─ perm  #权限模块                                           
│  │  ├─ prisma #基础的curd                                       
│  │  ├─ role  #角色模块                                           
│  │  ├─ tag   #标签模块（测试用）                                           
│  │  └─ user  #用户模块                                           
│  ├─ app.controller.ts                    
│  ├─ app.module.ts                        
│  ├─ app.service.ts                       
│  └─ main.ts #项目入口                             
├─ uploads #文件上传存放目录                                       
├─ API.README.md                           
├─ nest-cli.json                           
├─ package.json                            
├─ pnpm-lock.yaml                          
├─ README.md                               
├─ tsconfig.build.json                     
└─ tsconfig.json                           

```

## API Doc

具体API文档参考：https://console-docs.apipost.cn/preview/0191de7b24ce4a57/66447df746ed1165

### routes

#### auth

```
POST    /api/login
```

#### 用户

```
GET    /api/user
GET    /api/user/1
POST    /api/user
PATCH   /api/user/1
DELETE    /api/user/1
```

#### 角色

```
GET    /api/role
GET    /api/role/1
POST    /api/role
PATCH   /api/role/1
DELETE    /api/role/1
```

#### 实体&权限

```
GET    /api/perm
GET    /api/perm/1
POST    /api/perm
PATCH   /api/perm/1
DELETE    /api/perm/1
```

#### 文件上传

```
POST    /api/upload/image
```

### Paginate

使用`_page` 和`_size`

```
GET /user?_page=1&_size=10
```

- _page默认值为1
- _size默认值为10

### Sort

Add `_sort` and `_order` (ascending order by default)

```
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

For multiple fields, use the following format:

```
GET /posts?_sort=user,views&_order=desc,asc
```

### Operators

`prisma`的操作符映射，参考这里

```typescript
export const QUERY_OP_MAP = {
  eq: 'equals',
  neq: 'not',
  like: 'contains',
};
export const QUERY_INTEGER_OP_MAP = {
  eq: 'equals',
  in: 'int',
  lt: 'lt',
  lte: 'lte',
  gt: 'gt',
  gte: 'gte',
  not: 'not',
};
```

Add `_gte` or `_lte` for getting a range

```
GET /posts?views_gte=10&views_lte=20
```

Add `_ne` to exclude a value

```
GET /posts?id_ne=1
```

Add `_like` 同`js`中的`includes`

```
GET /user?username_like=test
```

### Full-text search

Add `q`和`qFields`

```
GET /user?q=test&qFields=username
```

### Relationships

To include children resources, add `_include`

```
GET /role?_include=perms
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
