import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/helpers/constants";

@Injectable()
export class UserService {
    constructor(
        @Inject(RepositoriesTag.USER)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}