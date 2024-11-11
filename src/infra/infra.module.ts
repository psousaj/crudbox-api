import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { CollectionController } from "@infra/http/controllers/collection.controller";
import { ProjectController } from "@infra/http/controllers/project.controller";
import { TenantController } from "@infra/http/controllers/tenant.controller";
import { UserController } from "@infra/http/controllers/user.controller";
import { DomainModule } from "@/domain/domain.module";

@Module({
    imports: [
        DatabaseModule,
        DomainModule
    ],
    controllers: [
        CollectionController,
        ProjectController,
        TenantController,
        UserController,
    ],
})
export class InfraModule { }