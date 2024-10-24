import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseTags } from "@/helpers/constants";
import { Tenant } from "../entities/tenant.entity";

@Injectable()
export class TenantService {
    constructor(
        @Inject(DatabaseTags.SQL) // Injetando DataSource SQL
        private tenantRepository: Repository<Tenant>
    ) { }

    async findAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }
}
