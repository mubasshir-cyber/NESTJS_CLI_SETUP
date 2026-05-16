import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { {{entityName}} } from './entities/{{kebabName}}.entity';

import { Create{{entityName}}Dto } from './dto/create-{{kebabName}}.dto';

import { Update{{entityName}}Dto } from './dto/update-{{kebabName}}.dto';

@Injectable()
export class {{moduleName}}Service {
  constructor(
    @InjectRepository({{entityName}})
    private readonly repository: Repository<{{entityName}}>,
  ) {}

  async create(
    dto: Create{{entityName}}Dto,
  ) {
    const entity = this.repository.create(dto);

    return this.repository.save(entity);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    dto: Update{{entityName}}Dto,
  ) {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: string) {
    return this.repository.delete(id);
  }
}