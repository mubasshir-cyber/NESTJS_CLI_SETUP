import dataSource from "../data-source.js";
import { adminSeed } from "./admin.seed.js";
import { permissionSeed } from "./permission.seed.js";
import { roleSeed } from "./role.seed.js";



async function seed() {
  await dataSource.initialize();

  await roleSeed();
  await adminSeed();
  await permissionSeed()

  await dataSource.destroy();
}

seed();
