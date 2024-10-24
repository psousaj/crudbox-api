import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseTags } from "@/helpers/constants";
import { UserTenant } from "../entities/userTenant.entity";

@Injectable()
export class UserTenantService {
    constructor(
        @Inject(DatabaseTags.SQL)
        private userTenantRepository: Repository<UserTenant>
    ) { }

    async findAll(): Promise<UserTenant[]> {
        return this.userTenantRepository.find();
    }
}
