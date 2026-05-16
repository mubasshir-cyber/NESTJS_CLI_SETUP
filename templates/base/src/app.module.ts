import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./modules/users/users.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { RolesModule } from "./modules/roles/roles.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",

      host: process.env.DB_HOST,

      port: Number(process.env.DB_PORT),

      username: process.env.DB_USERNAME,

      password: process.env.DB_PASSWORD,

      database: process.env.DB_DATABASE,

      autoLoadEntities: true,

      synchronize: false,
    }),

    UsersModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule {}
