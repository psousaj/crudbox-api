import { Module } from "@nestjs/common";
import { collectionRepositories } from "./repositories/collection.repositories";
import { CollectionService } from "./services/collection.service";
import { DatabaseModule } from "@/infra/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...collectionRepositories,
        CollectionService
    ],
    exports: [
        ...collectionRepositories,
        CollectionService
    ],
})
export class CollectionModule { }