import { handleProvider, RepositoriesTag } from "@/common/constants";
import { Tenant } from "../entities/tenant.entity";

export const tenantRepositories = [
    handleProvider(RepositoriesTag.TENANT, Tenant)
]
