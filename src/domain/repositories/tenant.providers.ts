import { handleProvider, RepositoriesTag } from "@/helpers/constants";
import { Tenant } from "../entities/tenant.entity";

export const userProviders = [
    handleProvider(RepositoriesTag.TENANT, Tenant)
]