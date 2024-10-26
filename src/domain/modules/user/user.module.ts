import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { userRepositories } from "@domain/modules/user/repositories/user.repositories";
import { UserService } from "@domain/modules/user/services/user.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...userRepositories,
        UserService
    ],
    exports: [
        ...userRepositories,
        UserService
    ],
})
export class UserModule { }