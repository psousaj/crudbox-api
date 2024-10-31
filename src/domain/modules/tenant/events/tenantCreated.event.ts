import { User } from "../../user/entities/user.entity";
import { Tenant } from "../entities/tenant.entity";

export class TenantCreatedEvent {
    constructor(
        public readonly tenant: Tenant,
        public readonly user: User,
    ) { }
}
