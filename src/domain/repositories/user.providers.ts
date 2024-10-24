import { User } from "@/domain/entities/user.entity";
import { handleProvider, RepositoriesTag } from "@/helpers/constants";

export const userProviders = [
    handleProvider(RepositoriesTag.USER, User)
]