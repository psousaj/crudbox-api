import { handleProvider, RepositoriesTag } from "@/common/constants";
import { Project } from "../entities/project.entity";

export const projectRepositories = [
    handleProvider(RepositoriesTag.PROJECT, Project)
]
