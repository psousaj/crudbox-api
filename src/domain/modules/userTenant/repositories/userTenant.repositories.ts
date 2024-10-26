import { handleProvider, RepositoriesTag } from "@/common/constants";
import { UserTenant } from "@domain/modules/userTenant/entities/userTenant.entity";

export const userTenantRepositories = [
    handleProvider(RepositoriesTag.USER_TENANT, UserTenant)
]
