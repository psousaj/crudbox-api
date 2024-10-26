import { DataSource, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { Project } from "@domain/modules/project/entities/project.entity";
import { RepositoriesTag } from "@/common/constants";

@Injectable()
export class ProjectService {
    constructor(
        @Inject(RepositoriesTag.PROJECT)
        private projectRepository: Repository<Project>
    ) { }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async findById(id: string): Promise<Project> {
        return this.projectRepository.findOneBy({ id });
    }

    async create(projectData: Partial<Project>): Promise<Project> {
        const project = this.projectRepository.create(projectData);
        return this.projectRepository.save(project);
    }

    async update(id: string, projectData: Partial<Project>): Promise<Project> {
        await this.projectRepository.update(id, projectData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.projectRepository.delete(id);
    }
}
