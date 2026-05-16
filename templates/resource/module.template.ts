import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { {{moduleName}}Controller } from './{{fileName}}.controller';

import { {{moduleName}}Service } from './{{fileName}}.service';

import { {{entityName}} } from './entities/{{kebabName}}.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([{{entityName}}]),
  ],

  controllers: [{{moduleName}}Controller],

  providers: [{{moduleName}}Service],
})
export class {{moduleName}}Module {}