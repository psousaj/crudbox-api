import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/helpers/constants";
import { Tenant } from "../entities/tenant.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(RepositoriesTag.TENANT)
        private userRepository: Repository<Tenant>
    ) { }

    async findAll(): Promise<Tenant[]> {
        return this.userRepository.find();
    }
}