import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity.js';
import { Role } from '../roles/entities/role.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto) {
    const exists = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const role = await this.roleRepository.findOne({
      where: { id: dto.role_id },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAll(page = 1, limit = 10, search?: string) {
    // const query = this.userRepository.createQueryBuilder(`users`);
    // if (search) {
    //   query.andWhere({});
    // }

    return this.userRepository.find({
      relations: ['role'],
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },

      relations: ['role', 'role.permissions'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },

      relations: ['role', 'role.permissions'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: Partial<User>) {
    await this.userRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }   
}
