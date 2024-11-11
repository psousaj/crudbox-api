import { handleProvider, RepositoriesTag } from "@/common/constants";
import { Organization } from "@domain/entities/organization.entity";

export const organizationRepositories = [
    handleProvider(RepositoriesTag.ORGANIZATION, Organization)
]
