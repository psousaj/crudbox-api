import { Repository } from "typeorm";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/common/constants";
import { Tenant } from "@domain/modules/tenant/entities/tenant.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { TenantCreatedEvent } from "@/domain/modules/tenant/events/tenantCreated.event";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class TenantService {
    constructor(
        @Inject(RepositoriesTag.TENANT)
        private tenantRepository: Repository<Tenant>,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async findAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }

    async findById(id: string): Promise<Tenant> {
        return this.tenantRepository.findOneBy({ id });
    }

    async create(tenantData: Partial<Tenant>, user: User): Promise<Tenant> {
        const existingTenant = await this.tenantRepository.findOne({
            where: { name: tenantData.name }
        });

        if (existingTenant) {
            throw new ConflictException('Já existe um tenant com este nome');
        }

        const tenant = this.tenantRepository.create(tenantData);
        const savedTenant = await this.tenantRepository.save(tenant);

        this.eventEmitter.emit(
            'tenant.created',
            new TenantCreatedEvent(savedTenant, user)
        );

        return savedTenant;
    }

    async update(id: string, tenantData: Partial<Tenant>): Promise<Tenant> {
        await this.tenantRepository.update(id, tenantData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.tenantRepository.delete(id);
    }
}
