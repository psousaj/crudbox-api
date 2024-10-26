import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/common/constants";
import { Tenant } from "@domain/modules/tenant/entities/tenant.entity";

@Injectable()
export class TenantService {
    constructor(
        @Inject(RepositoriesTag.TENANT)
        private tenantRepository: Repository<Tenant>
    ) { }

    async findAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }

    async findById(id: string): Promise<Tenant> {
        return this.tenantRepository.findOneBy({ id });
    }

    async create(tenantData: Partial<Tenant>): Promise<Tenant> {
        const tenant = this.tenantRepository.create(tenantData);
        return this.tenantRepository.save(tenant);
    }

    async update(id: string, tenantData: Partial<Tenant>): Promise<Tenant> {
        await this.tenantRepository.update(id, tenantData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.tenantRepository.delete(id);
    }
}
