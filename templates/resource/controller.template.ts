import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { {{moduleName}}Service } from './{{fileName}}.service';

import { Create{{entityName}}Dto } from './dto/create-{{kebabName}}.dto';
import { Update{{entityName}}Dto } from './dto/update-{{kebabName}}.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('{{moduleName}}')
@ApiBearerAuth()

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('{{routeName}}')
export class {{moduleName}}Controller {
  constructor(
    private readonly service: {{moduleName}}Service,
  ) {}

  @Post()
  create(
    @Body() dto: Create{{entityName}}Dto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Update{{entityName}}Dto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }
}