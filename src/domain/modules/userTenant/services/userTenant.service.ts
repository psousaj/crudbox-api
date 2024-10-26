import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/common/constants";
import { UserTenant } from "@domain/modules/userTenant/entities/userTenant.entity";

@Injectable()
export class UserTenantService {
    constructor(
        @Inject(RepositoriesTag.USER_TENANT)
        private userTenantRepository: Repository<UserTenant>
    ) { }

    async findAll(): Promise<UserTenant[]> {
        return this.userTenantRepository.find();
    }

    async findById(id: string): Promise<UserTenant> {
        return this.userTenantRepository.findOneBy({ id });
    }

    async create(userTenantData: Partial<UserTenant>): Promise<UserTenant> {
        const userTenant = this.userTenantRepository.create(userTenantData);
        return this.userTenantRepository.save(userTenant);
    }

    async update(id: string, userTenantData: Partial<UserTenant>): Promise<UserTenant> {
        await this.userTenantRepository.update(id, userTenantData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.userTenantRepository.delete(id);
    }
}
