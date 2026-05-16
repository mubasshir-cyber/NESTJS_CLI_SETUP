import fs from 'fs-extra';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
  import.meta.url,
);

const __dirname = path.dirname(__filename);

export async function generateUserModule(
  projectPath,
) {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    'base',
    'src',
    'modules',
    'users',
  );

  const destinationPath = path.join(
    projectPath,
    'src',
    'modules',
    'users',
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
      template: 'entities/user.entity.ts',
      output: 'entities/user.entity.ts',
    },
    {
      template:
        'dto/create-user.dto.ts',
      output: 'dto/create-user.dto.ts',
    },
    {
      template:
        'dto/update-user.dto.ts',
      output: 'dto/update-user.dto.ts',
    },
    {
      template:
        'users.service.ts',
      output: 'users.service.ts',
    },
    {
      template:
        'users.controller.ts',
      output: 'users.controller.ts',
    },
    {
      template:
        'users.module.ts',
      output: 'users.module.ts',
    },
  ];

  for (const file of files) {
    await fs.copy(
      path.join(templatePath, file.template),

      path.join(destinationPath, file.output),
    );
  }

  console.log(
    '✅ Users module generated',
  );
}