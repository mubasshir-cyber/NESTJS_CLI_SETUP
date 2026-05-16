import dataSource from '../data-source.js';

import { Permission } from '../../modules/permissions/entities/permission.entity.js';

export async function permissionSeed() {
  const permissionRepository = dataSource.getRepository(Permission);

  const permissions = [
    'user.create',
    'user.update',
    'user.delete',
    'user.view',

    'report.view',
    'report.export',

    'attendance.manage',
  ];

  for (const permission of permissions) {
    const exists = await permissionRepository.findOne({
      where: {
        name: permission,
      },
    });

    if (!exists) {
      await permissionRepository.save({
        name: permission,
      });
    }
  }

  console.log('Permissions created');
}
