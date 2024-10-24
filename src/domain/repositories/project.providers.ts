import { handleProvider, RepositoriesTag } from "@/helpers/constants";
import { Project } from "../entities/project.entity";

export const userProviders = [
    handleProvider(RepositoriesTag.PROJECT, Project)
]