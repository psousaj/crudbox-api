import { DatabaseModule } from "@/infra/database/database.module";
import { Module } from "@nestjs/common";
import { allRepositories } from "./repositories/allRepositories.export";
import { CollectionService } from "./services/collection.service";
import { DataItemService } from "./services/dataItem.service";
import { ProjectService } from "./services/project.service";
import { OrganizationService } from "./services/organization.service";
import { UserService } from "./services/user.service";
import { UserTenantService } from "./services/userTenant.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...allRepositories,
        CollectionService,
        DataItemService,
        ProjectService,
        OrganizationService,
        UserService,
        UserTenantService
    ],
    exports: [
        ...allRepositories,
        CollectionService,
        DataItemService,
        ProjectService,
        OrganizationService,
        UserService,
        UserTenantService
    ]
})
export class DomainModule { }