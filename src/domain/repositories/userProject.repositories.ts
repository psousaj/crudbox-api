import { handleProvider, RepositoriesTag } from "@/common/constants";
import { UserProject } from "../entities/userProject.entity";

export const userProjectsRepositories = [
    handleProvider(RepositoriesTag.USER_PROJECT, UserProject)
]
