import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseTags } from "@/helpers/constants";
import { Project } from "../entities/project.entity";

@Injectable()
export class ProjectService {
    constructor(
        @Inject(DatabaseTags.SQL) // Injetando DataSource SQL
        private projectRepository: Repository<Project>
    ) { }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }
}
