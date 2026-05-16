import dataSource from '../data-source.js';
import { Role } from '../../modules/roles/entities/role.entity.js';


export async function roleSeed() {
  const repository = dataSource.getRepository(Role);

  const roles = [{ name: 'admin' }, { name: 'manager' }, { name: 'employee' }];

  for (const role of roles) {
    const exists = await repository.findOne({
      where: { name: role.name },
    });

    if (!exists) {
      await repository.save(role);
    }
  }

  console.log('roles created');
}
