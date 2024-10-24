import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RepositoriesTag } from "@/helpers/constants";
import { Collection, CollectionNOSQL } from "../entities/collection.entity";

@Injectable()
export class CollectionService {
    constructor(
        @Inject(RepositoriesTag.COLLECTION)
        private collectionRepository: Repository<Collection>,
        @Inject(RepositoriesTag.COLLECTION_NOSQL)
        private collectionNoSQLRepository: Repository<CollectionNOSQL>
    ) { }

    async findAll(): Promise<Collection[]> {
        return this.collectionRepository.find();
    }
    async findAllNoSQL(): Promise<CollectionNOSQL[]> {
        return this.collectionNoSQLRepository.find();
    }
}