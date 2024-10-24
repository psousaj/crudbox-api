import { handleProvider, RepositoriesTag } from "@/helpers/constants";
import { UserTenant } from "../entities/userTenant.entity";

export const userTenantProviders = [
    handleProvider(RepositoriesTag.USER_TENANT, UserTenant)
]
