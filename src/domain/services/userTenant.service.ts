import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/helpers/constants";
import { UserTenant } from "../entities/userTenant.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(RepositoriesTag.USER_TENANT)
        private userRepository: Repository<UserTenant>
    ) { }

    async findAll(): Promise<UserTenant[]> {
        return this.userRepository.find();
    }
}