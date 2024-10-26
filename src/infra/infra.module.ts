import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { CollectionController } from "@infra/http/controllers/collection.controller";
import { ProjectController } from "@infra/http/controllers/project.controller";
import { TenantController } from "@infra/http/controllers/tenant.controller";
import { UserController } from "@infra/http/controllers/user.controller";
import { UserTenantController } from "@infra/http/controllers/userTenant.controller";
import { CollectionModule } from "@/domain/modules/collection/collection.module";
import { DataItemModule } from "@/domain/modules/dataItem/dataItem.module";
import { ProjectModule } from "@/domain/modules/project/project.module";
import { TenantModule } from "@/domain/modules/tenant/tenant.module";
import { UserModule } from "@/domain/modules/user/user.module";
import { UserTenantModule } from "@/domain/modules/userTenant/userTenant.module";

@Module({
    imports: [
        DatabaseModule,
        CollectionModule,
        DataItemModule,
        ProjectModule,
        TenantModule,
        UserModule,
        UserTenantModule
    ],
    controllers: [
        CollectionController,
        ProjectController,
        TenantController,
        UserController,
        UserTenantController
    ],
})
export class InfraModule { }