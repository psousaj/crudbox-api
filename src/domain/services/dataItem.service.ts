import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseTags } from "@/helpers/constants";
import { DataItem, DataItemNOSQL } from "../entities/dataItem.entity";

@Injectable()
export class DataItemService {
    constructor(
        @Inject(DatabaseTags.SQL) // Injetando DataSource SQL
        private dataItemRepository: Repository<DataItem>,
        @Inject(DatabaseTags.NOSQL) // Injetando DataSource NoSQL
        private dataItemNoSQLRepository: Repository<DataItemNOSQL>
    ) { }

    async findAll(): Promise<DataItem[]> {
        return this.dataItemRepository.find();
    }

    async findAllNoSQL(): Promise<DataItemNOSQL[]> {
        return this.dataItemNoSQLRepository.find();
    }
}
