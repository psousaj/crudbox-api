import { collectionRepositories } from "./collection.repositories";
import { projectRepositories } from "./project.repositories";
import { organizationRepositories } from "./organization.repositories";
import { userRepositories } from "./user.repositories";
import { userProjectsRepositories } from "./userProject.repositories";

export const allRepositories = [
    ...collectionRepositories,
    ...projectRepositories,
    ...organizationRepositories,
    ...userRepositories,
    ...userProjectsRepositories
]