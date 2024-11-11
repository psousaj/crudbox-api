import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/common/constants";
import { Project } from "../entities/project.entity";
import { UserProject } from "../entities/userProject.entity";

@Injectable()
export class UserProjectService {
    constructor(
        @Inject(RepositoriesTag.USER_PROJECT)
        private userProjectRepository: Repository<UserProject>,
    ) { }

    async findAll(): Promise<UserProject[]> {
        return await this.userProjectRepository.find();
    }

    async findUserProjectById(id: string): Promise<UserProject> {
        return this.userProjectRepository.findOneBy({ id });
    }

    async createUserProject(userProjectData: Omit<UserProject, 'id' | 'projects'> & { project: Project }): Promise<UserProject> {
        const userProject = this.userProjectRepository.create(userProjectData);
        return this.userProjectRepository.save(userProject);
    }

    async updateUserProject(id: string, userProjectData: Partial<UserProject>): Promise<UserProject> {
        await this.userProjectRepository.update(id, userProjectData);
        return this.findUserProjectById(id);
    }

    async deleteUserProject(id: string): Promise<void> {
        await this.userProjectRepository.delete(id);
    }
}