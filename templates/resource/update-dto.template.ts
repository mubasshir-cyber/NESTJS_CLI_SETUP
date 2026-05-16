import { PartialType } from '@nestjs/mapped-types';

import { Create{{entityName}}Dto } from './create-{{kebabName}}.dto';

export class Update{{entityName}}Dto extends PartialType(
  Create{{entityName}}Dto,
) {}