import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { projectRepositories } from "@domain/modules/project/repositories/project.repositories";
import { ProjectService } from "@domain/modules/project/services/project.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...projectRepositories,
        ProjectService
    ],
    exports: [
        ...projectRepositories,
        ProjectService
    ],
})
export class ProjectModule { }