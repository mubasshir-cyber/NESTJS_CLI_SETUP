import { IsString } from 'class-validator';

export class Create{{entityName}}Dto {
  @IsString()
  name: string;
}