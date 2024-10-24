import { handleProvider, RepositoriesTag } from "@/helpers/constants";
import { UserTenant } from "../entities/userTenant.entity";

export const userProviders = [
    handleProvider(RepositoriesTag.USER_TENANT, UserTenant)
]