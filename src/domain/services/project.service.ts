import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { Project } from "@/domain/entities/project.entity";
import { RepositoriesTag } from "@/common/constants";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProjectCreatedEvent } from "../events/projectCreated.event";
import { User } from "../entities/user.entity";

@Injectable()
export class ProjectService {
    constructor(
        @Inject(RepositoriesTag.PROJECT)
        private projectRepository: Repository<Project>,

        private readonly eventEmitter: EventEmitter2
    ) { }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    async findById(id: string): Promise<Project> {
        return await this.projectRepository.findOneBy({ id });
    }

    async create(projectData: Partial<Project>, user: User): Promise<Project> {
        const project = this.projectRepository.create(projectData);
        const savedProject = await this.projectRepository.save(project);

        this.eventEmitter.emit(
            'tenant.created',
            new ProjectCreatedEvent(savedProject, user)
        );

        return savedProject;
    }

    async update(id: string, projectData: Partial<Project>): Promise<Project> {
        await this.projectRepository.update(id, projectData);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.projectRepository.delete(id);
    }
}
