import fs from 'fs-extra';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
  import.meta.url,
);

const __dirname = path.dirname(__filename);

export async function generateEmployeeModule(
  projectPath,
) {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    'base',
    'src',
    'modules',
    'employees',
  );

  const destinationPath = path.join(
    projectPath,
    'src',
    'modules',
    'employees',
  );

  await fs.mkdirp(destinationPath);

  await fs.mkdirp(
    path.join(destinationPath, 'dto'),
  );

  await fs.mkdirp(
    path.join(destinationPath, 'entities'),
  );

  const files = [
    {
      template: 'entities/employee.entity.ts',
      output: 'entities/employee.entity.ts',
    },
    {
      template:
        'dto/create-employee.dto.ts',
      output: 'dto/create-employee.dto.ts',
    },
    {
      template:
        'dto/update-employee.dto.ts',
      output: 'dto/update-employee.dto.ts',
    },
    {
      template:
        'employees.service.ts',
      output: 'employees.service.ts',
    },
    {
      template:
        'employees.controller.ts',
      output: 'employees.controller.ts',
    },
    {
      template:
        'employees.module.ts',
      output: 'employees.module.ts',
    },
  ];

  for (const file of files) {
    await fs.copy(
      path.join(templatePath, file.template),

      path.join(destinationPath, file.output),
    );
  }

  console.log(
    '✅ Employees module generated',
  );
}