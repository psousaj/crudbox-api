import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { tenantRepositories } from "@domain/modules/tenant/repositories/tenant.repositories";
import { TenantService } from "@domain/modules/tenant/services/tenant.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...tenantRepositories,
        TenantService
    ],
    exports: [
        ...tenantRepositories,
        TenantService
    ],
})
export class TenantModule { }