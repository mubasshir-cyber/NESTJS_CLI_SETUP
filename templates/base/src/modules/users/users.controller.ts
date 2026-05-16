import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { RoleEnum } from '../../common/enums/role.enum.js';
import { PermissionsGuard } from '../../common/guards/permissions.guard.js';
import { Permissions } from '../../common/decorators/permissions.decorator.js';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Permissions('user.view,user,user.delete')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('user.delete')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.usersService.remove(id);
  }
}
