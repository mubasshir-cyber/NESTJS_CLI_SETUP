#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import { execa } from "execa";
import path from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";

import { generateUserModule } from "../generators/user.generator.js";
import { generateAuthModule } from "../generators/auth.generator.js";
import { generateResource } from "../generators/resource.generator.js";
import { checkNestProject } from "../utils/check-project.js";

const program = new Command();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//
// CREATE PROJECT
//

program
  .command("new")
  .description("Create new Mubasshir System project")
  .action(async () => {
    console.log(chalk.cyan.bold("\n🚀 MUBASSHIR SYSTEM GENERATOR 🚀\n"));

    const answers = await inquirer.prompt([
      {
        type: "input",

        name: "projectName",

        message: "Enter project name:",

        default: "mubasshir-system",

        validate: (input) => {
          const valid = /^[a-z0-9-_]+$/.test(input);

          return valid || "Use lowercase letters, numbers and hyphens only";
        },
      },
    ]);

    const { projectName } = answers;

    const spinner = ora(`Creating ${projectName}...`).start();

    try {
      //
      // CREATE NEST PROJECT
      //

      await execa(
        "npx",
        [
          "@nestjs/cli",
          "new",
          projectName,
          "--package-manager",
          "npm",
          "--skip-install",
          "--skip-git",
        ],
        {
          stdio: "inherit",
        },
      );

      spinner.succeed("Nest project created");

      const projectPath = path.join(process.cwd(), projectName);

      //
      // REMOVE DEFAULT NEST FILES
      //

      spinner.start("Cleaning default Nest files...");

      await fs.remove(path.join(projectPath, "src"));

      await fs.remove(path.join(projectPath, "test"));

      spinner.succeed("Default files removed");

      //
      // COPY BASE FILES
      //

      spinner.start("Copying boilerplate...");

      const templatePath = path.join(__dirname, "..", "templates", "base");

      await fs.copy(templatePath, projectPath, {
        overwrite: true,

        filter: (src) => !src.endsWith(".template.ts"),
      });

      spinner.succeed("Boilerplate copied");

      //
      // GENERATE USERS MODULE
      //

      spinner.start("Generating Users module...");

      await generateUserModule(projectPath);

      spinner.succeed("Users module generated");

      //
      // GENERATE AUTH MODULE
      //

      spinner.start("Generating Auth module...");

      await generateAuthModule(projectPath);

      spinner.succeed("Auth module generated");

      //
      // INSTALL DEPENDENCIES
      //

      spinner.start("Installing dependencies...");

      process.chdir(projectPath);

      await execa("npm", ["install"], {
        stdio: "inherit",
      });

      spinner.succeed("Dependencies installed");

      //
      // FINISHED
      //

      console.log(chalk.green.bold("\n✅ MUBASSHIR SYSTEM READY!\n"));

      console.log(chalk.yellow("NEXT STEPS:\n"));

      console.log(`cd ${projectName}`);

      console.log(`npm run start:dev\n`);
    } catch (error) {
      spinner.fail("Project creation failed");

      console.error(error);
    }
  });

//
// RESOURCE GENERATOR
//

program
  .command("resource <name>")
  .description("Generate CRUD resource")
  .action(async (name) => {
    const projectPath = process.cwd();

    checkNestProject(projectPath);

    if (name.toLowerCase() === "users") {
      console.log("\n❌ Users module already exists\n");

      process.exit(1);
    }

    await generateResource(projectPath, name);
  });

//
// DEFAULT COMMAND
//

if (!process.argv.slice(2).length) {
  process.argv.push("new");
}

program.parse(process.argv);
