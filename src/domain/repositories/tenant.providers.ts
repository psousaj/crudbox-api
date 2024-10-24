import { handleProvider, RepositoriesTag } from "@/helpers/constants";
import { Tenant } from "../entities/tenant.entity";

export const tenantProviders = [
    handleProvider(RepositoriesTag.TENANT, Tenant)
]
