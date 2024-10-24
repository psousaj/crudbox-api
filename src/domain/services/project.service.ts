import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/helpers/constants";
import { Project } from "../entities/project.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(RepositoriesTag.PROJECT)
        private userRepository: Repository<Project>
    ) { }

    async findAll(): Promise<Project[]> {
        return this.userRepository.find();
    }
}