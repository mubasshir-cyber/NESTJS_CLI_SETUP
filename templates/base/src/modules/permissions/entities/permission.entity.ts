import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Role } from '../../../modules/roles/entities/role.entity.js';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
  })
  name!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
