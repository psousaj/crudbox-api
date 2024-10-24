import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseTags } from "@/helpers/constants";
import { Collection, CollectionNOSQL } from "../entities/collection.entity";

@Injectable()
export class CollectionService {
    constructor(
        @Inject(DatabaseTags.SQL)
        private collectionRepository: Repository<Collection>,
        @Inject(DatabaseTags.NOSQL)
        private collectionNoSQLRepository: Repository<CollectionNOSQL>
    ) { }

    async findAll(): Promise<Collection[]> {
        return this.collectionRepository.find();
    }

    async findAllNoSQL(): Promise<CollectionNOSQL[]> {
        return this.collectionNoSQLRepository.find();
    }
}
