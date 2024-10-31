import { Repository } from "typeorm";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RepositoriesTag, UserRole } from "@/common/constants";
import { UserTenant } from "@domain/modules/userTenant/entities/userTenant.entity";
import { Collection } from "@domain/modules/collection/entities/collection.entity";
import { Project } from "@domain/modules/project/entities/project.entity";
import { Tenant } from "@domain/modules/tenant/entities/tenant.entity";

@Injectable()
export class UserTenantService {
    constructor(
        @Inject(RepositoriesTag.USER_TENANT)
        private userTenantRepository: Repository<UserTenant>,

        @Inject(RepositoriesTag.COLLECTION)
        private collectionRepository: Repository<Collection>,

        @Inject(RepositoriesTag.PROJECT)
        private projectRepository: Repository<Project>
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

    async hasUserRoleForTenant(
        userId: string,
        tenantId: string,
        requiredRoles: UserRole[]
    ): Promise<boolean> {
        const userTenant = await this.userTenantRepository.findOne({
            where: {
                id: userId,
                tenant: {
                    id: tenantId
                },
            },
            select: ['role'],
        });

        return userTenant ? requiredRoles.includes(userTenant.role) : false;
    }

    async getProjectByCollection(collectionId: string): Promise<Project> {
        const collection = await this.collectionRepository.findOne({
            where: { id: collectionId },
            relations: ['project'],
        });

        if (!collection) {
            throw new NotFoundException(`Collection with ID ${collectionId} not found`);
        }

        return collection.project;
    }

    async getTenantByProject(projectId: string): Promise<Tenant> {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['tenant'],
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }

        return project.tenant;
    }
}
