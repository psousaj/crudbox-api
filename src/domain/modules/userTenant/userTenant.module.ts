import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { userTenantRepositories } from "@domain/modules/userTenant/repositories/userTenant.repositories";
import { UserTenantService } from "@domain/modules/userTenant/services/userTenant.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...userTenantRepositories,
        UserTenantService
    ],
    exports: [
        ...userTenantRepositories,
        UserTenantService
    ],
})
export class UserTenantModule { }