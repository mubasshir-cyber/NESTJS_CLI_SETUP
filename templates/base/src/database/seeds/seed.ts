import AppDataSource from "../data-source.js";
import { adminSeed } from "./admin.seed.js";
import { permissionSeed } from "./permission.seed.js";
import { roleSeed } from "./role.seed.js";
import { syncRBAC } from "./sync-rbac.seed.js";

async function seed() {
  await AppDataSource.initialize();

  await roleSeed();
  await adminSeed();
  await permissionSeed()
  await syncRBAC(AppDataSource);
  await AppDataSource.initialize();
  
}

seed();
