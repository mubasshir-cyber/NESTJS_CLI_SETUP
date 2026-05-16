import * as bcrypt from 'bcrypt';

import dataSource from '../data-source.js';
import { User } from '../../modules/users/entities/user.entity.js';
import { Role } from '../../modules/roles/entities/role.entity.js';

export async function adminSeed() {
  const userRepository = dataSource.getRepository(User);

  const roleRepository = dataSource.getRepository(Role);

  const adminRole = await roleRepository.findOne({
    where: {
      name: 'admin',
    },
  });

  // IMPORTANT CHECK
  if (!adminRole) {
    throw new Error('Admin role not found. Run role seed first.');
  }

  const exists = await userRepository.findOne({
    where: {
      email: 'admin@gmail.com',
    },
  });

  if (exists) {
    console.log('Admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin123', 10);

  await userRepository.save({
    name: 'Super Admin',
    email: 'admin@gmail.com',
    password: hashedPassword,
    role_id: adminRole.id,
  });

  console.log('Admin created');
}
