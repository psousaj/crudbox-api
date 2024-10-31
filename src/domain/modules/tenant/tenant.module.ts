import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { tenantRepositories } from "@domain/modules/tenant/repositories/tenant.repositories";
import { TenantService } from "@domain/modules/tenant/services/tenant.service";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TenantEventListener } from "./events/tenantListener.event";
import { UserTenantService } from "../userTenant/services/userTenant.service";
import { UserTenantModule } from "../userTenant/userTenant.module";

@Module({
    imports: [
        DatabaseModule,
        UserTenantModule,
        EventEmitterModule.forRoot(),
    ],
    providers: [
        ...tenantRepositories,
        TenantService,
        TenantEventListener,
    ],
    exports: [
        ...tenantRepositories,
        TenantService
    ],
})
export class TenantModule { }