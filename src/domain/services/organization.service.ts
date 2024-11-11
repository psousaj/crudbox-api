import { Repository } from "typeorm";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/common/constants";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Organization } from "@/domain/entities/organization.entity";
import { User } from "@domain/entities/user.entity";

@Injectable()
export class OrganizationService {
    constructor(
        @Inject(RepositoriesTag.ORGANIZATION)
        private tenantRepository: Repository<Organization>,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async findAll(): Promise<Organization[]> {
        return this.tenantRepository.find();
    }

    async findById(id: string): Promise<Organization> {
        return this.tenantRepository.findOneBy({ id });
    }

    async create(tenantData: Partial<Organization>, user: User): Promise<Organization> {
        const existingTenant = await this.tenantRepository.findOne({
            where: { name: tenantData.name }
        });

        if (existingTenant) {
            throw new ConflictException('Já existe um tenant com este nome');
        }

        const tenant = this.tenantRepository.create(tenantData);
        const savedTenant = await this.tenantRepository.save(tenant);

        return savedTenant;
    }

    async update(id: string, tenantData: Partial<Organization>): Promise<Organization> {
        await this.tenantRepository.update(id, tenantData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.tenantRepository.delete(id);
    }
}
