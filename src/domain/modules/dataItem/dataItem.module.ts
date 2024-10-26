import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/infra/database/database.module";
import { dataItemRepositories } from "@domain/modules/dataItem/repositories/dataItem.repositories";
import { DataItemService } from "@domain/modules/dataItem/services/dataItem.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...dataItemRepositories,
        DataItemService
    ],
    exports: [
        ...dataItemRepositories,
        DataItemService
    ],
})
export class DataItemModule { }