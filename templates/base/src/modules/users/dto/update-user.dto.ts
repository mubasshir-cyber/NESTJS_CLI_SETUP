import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  //   @IsString()
  //   name!: string;

  //   @IsEmail()
  //   email!: string;

  //   @MinLength(6)
  //   password!: string;

  //   @IsString()
  //   role_id!: string;

  @IsString()
  refreshToken?: string;
}
