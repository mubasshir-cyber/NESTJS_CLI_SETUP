import fs from 'fs-extra';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
  import.meta.url,
);

const __dirname = path.dirname(__filename);

export async function generateAuthModule(
  projectPath,
) {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    'base',
    'src',
    'modules',
    'auth',
  );

  const destinationPath = path.join(
    projectPath,
    'src',
    'modules',
    'auth',
  );

  await fs.mkdirp(destinationPath);

  await fs.mkdirp(
    path.join(destinationPath, 'dto'),
  );

  await fs.mkdirp(
    path.join(destinationPath, 'guards'),
  );

  await fs.mkdirp(
    path.join(destinationPath, 'strategies'),
  );

  const files = [
    {
      template:
        'dto/login.dto/login.dto.ts',

      output: 'dto/login.dto.ts',
    },

    {
      template:
        'dto/register.dto/register.dto.ts',

      output: 'dto/register.dto.ts',
    },

    {
      template:
        'strategies/jwt.strategy.ts',

      output:
        'strategies/jwt.strategy.ts',
    },

    {
      template:
        '../../common/guards/jwt-auth.guard/jwt-auth.guard.ts',

      output:
        '../../common/guards/jwt-auth.guard.ts',
    },

    {
      template:
        '../../common/interfaces/jwt-payload.interface.ts',

      output:
        'interfaces/jwt-payload.interface.ts',
    },
    {
      template:
        '../../config/database.config.ts',
      output:
        '../../config/database.config.ts',
    },

    {
      template:
        'auth.service.ts',

      output: 'auth.service.ts',
    },

    {
      template:
        'auth.controller.ts',

      output: 'auth.controller.ts',
    },

    {
      template:
        'auth.module.ts',

      output: 'auth.module.ts',
    },
  ];

  for (const file of files) {
    await fs.copy(
      path.join(templatePath, file.template),

      path.join(destinationPath, file.output),
    );
  }

  console.log(
    '✅ Auth module generated',
  );
}