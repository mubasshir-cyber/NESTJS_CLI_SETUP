import fs from 'fs-extra';

import path from 'path';

export function checkNestProject(projectPath) {
  const srcPath = path.join(
    projectPath,
    'src',
  );

  if (!fs.existsSync(srcPath)) {
    console.log(
      '\n❌ Not a valid NestJS project\n',
    );

    process.exit(1);
  }
}