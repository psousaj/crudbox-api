import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/helpers/constants";
import { DataItem, DataItemNOSQL } from "../entities/dataItem.entity";

@Injectable()
export class DataItemService {
    constructor(
        @Inject(RepositoriesTag.COLLECTION)
        private collectionRepository: Repository<DataItem>,
        @Inject(RepositoriesTag.COLLECTION_NOSQL)
        private collectionNoSQLRepository: Repository<DataItemNOSQL>
    ) { }

    async findAll(): Promise<DataItem[]> {
        return this.collectionRepository.find();
    }
    async findAllNoSQL(): Promise<DataItemNOSQL[]> {
        return this.collectionNoSQLRepository.find();
    }
}