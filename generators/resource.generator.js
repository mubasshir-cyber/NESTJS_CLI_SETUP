import fs from 'fs-extra';

import path from 'path';

import { fileURLToPath } from 'url';

function replaceTemplate(content, variables) {
  let result = content;

  for (const key in variables) {
    result = result.replaceAll(
      `{{${key}}}`,
      variables[key],
    );
  }

  return result;
}

export async function generateResource(
  projectPath,
  resourceName,
) {
  const moduleName =
    resourceName.charAt(0).toUpperCase() +
    resourceName.slice(1);

  const entityName =
    resourceName.charAt(0).toUpperCase() +
    resourceName.slice(1, -1);

  const fileName = resourceName;

  const kebabName = resourceName.slice(0, -1);

  const variables = {
    moduleName,
    entityName,
    fileName,
    kebabName,
    routeName: resourceName,
    tableName: resourceName,
  };

  // WINDOWS SAFE PATH
  const __filename = fileURLToPath(
    import.meta.url,
  );

  const __dirname = path.dirname(__filename);

  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    'resource',
  );

  const destinationPath = path.join(
    projectPath,
    'src',
    'modules',
    resourceName,
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
      template: 'controller.template.ts',
      output: `${fileName}.controller.ts`,
    },
    {
      template: 'service.template.ts',
      output: `${fileName}.service.ts`,
    },
    {
      template: 'module.template.ts',
      output: `${fileName}.module.ts`,
    },
    {
      template: 'entity.template.ts',
      output: `entities/${kebabName}.entity.ts`,
    },
    {
      template: 'create-dto.template.ts',
      output: `dto/create-${kebabName}.dto.ts`,
    },
    {
      template: 'update-dto.template.ts',
      output: `dto/update-${kebabName}.dto.ts`,
    },
  ];

  for (const file of files) {
    const templateContent =
      await fs.readFile(
        path.join(templatePath, file.template),
        'utf-8',
      );

    const finalContent = replaceTemplate(
      templateContent,
      variables,
    );

    await fs.writeFile(
      path.join(destinationPath, file.output),
      finalContent,
    );
  }

  console.log(
    `✅ Resource ${resourceName} generated`,
  );
}