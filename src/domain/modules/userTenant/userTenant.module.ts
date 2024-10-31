import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { userTenantRepositories } from "@domain/modules/userTenant/repositories/userTenant.repositories";
import { UserTenantService } from "@domain/modules/userTenant/services/userTenant.service";
import { ProjectModule } from "../project/project.module";
import { CollectionModule } from "../collection/collection.module";

@Module({
    imports: [DatabaseModule, CollectionModule, ProjectModule],
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