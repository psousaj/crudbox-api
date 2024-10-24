import { handleProvider, RepositoriesTag } from "@/helpers/constants";
import { Project } from "../entities/project.entity";

export const projectProviders = [
    handleProvider(RepositoriesTag.PROJECT, Project)
]
