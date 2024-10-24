import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provider";
import { EnvService } from "@/helpers/env/env.service";

@Module({
    providers: [...databaseProviders, EnvService],
    exports: [...databaseProviders]
})
export class DatabaseModule { }