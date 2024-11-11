import { handleProvider, RepositoriesTag } from "@/common/constants";
import { User } from "@domain/entities/user.entity";

export const userRepositories = [
    handleProvider(RepositoriesTag.USER, User)
]
