import { handleProvider, RepositoriesTag } from "@/common/constants";
import { Project } from "@domain/entities/project.entity";

export const projectRepositories = [
    handleProvider(RepositoriesTag.PROJECT, Project)
]
