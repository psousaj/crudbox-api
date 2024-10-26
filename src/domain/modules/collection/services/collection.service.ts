import { ObjectId, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { Collection } from "@domain/modules/collection/entities/collection.entity";
import { CollectionNOSQL } from "@domain/modules/collection/entities/collection.document";
import { RepositoriesTag } from "@/common/constants";

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

    async findById(id: string): Promise<Collection> {
        return this.collectionRepository.findOneBy({ id });
    }

    async create(collectionData: Partial<Collection>): Promise<Collection> {
        const collection = this.collectionRepository.create(collectionData);
        return this.collectionRepository.save(collection);
    }

    async update(id: string, collectionData: Partial<Collection>): Promise<Collection> {
        await this.collectionRepository.update(id, collectionData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.collectionRepository.delete(id);
    }

    async findAllNoSQL(): Promise<CollectionNOSQL[]> {
        return this.collectionNoSQLRepository.find();
    }

    async findNoSQLById(id: string): Promise<CollectionNOSQL> {
        return this.collectionNoSQLRepository.findOneBy({ id: new ObjectId(id) });
    }

    async createNoSQL(collectionData: Partial<CollectionNOSQL>): Promise<CollectionNOSQL> {
        const collection = this.collectionNoSQLRepository.create(collectionData);
        return this.collectionNoSQLRepository.save(collection);
    }

    async updateNoSQL(id: string, collectionData: Partial<CollectionNOSQL>): Promise<CollectionNOSQL> {
        await this.collectionNoSQLRepository.update(id, collectionData);
        return this.findNoSQLById(id);
    }

    async deleteNoSQL(id: string): Promise<void> {
        await this.collectionNoSQLRepository.delete(id);
    }
}
