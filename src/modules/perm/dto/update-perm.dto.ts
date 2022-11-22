import { PartialType } from '@nestjs/mapped-types';
import { CreatePermDto } from './create-perm.dto';

export class UpdatePermDto extends PartialType(CreatePermDto) {}
