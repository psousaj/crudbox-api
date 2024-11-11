import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Collection, CollectionField } from "../entities/collection.entity";
import { RepositoriesTag } from "@/common/constants";
import { CreateCollectionDTO, UpdateCollectionDTO, UpdateFieldDTO } from "../dtos/collection.dto";

@Injectable()
export class CollectionsService {
    constructor(
        @Inject(RepositoriesTag.COLLECTION)
        private readonly collectionRepository: Repository<Collection>,
        @Inject(RepositoriesTag.COLLECTION_FIELD)
        private readonly fieldRepository: Repository<CollectionField>
    ) { }

    // Create
    async createCollection(projectId: string, data: CreateCollectionDTO): Promise<Collection> {
        return await this.collectionRepository.manager.transaction(async (manager) => {
            const collection = await manager.save(Collection, {
                name: data.name,
                description: data.description,
                project: { id: projectId }
            });

            if (data.fields?.length) {
                await Promise.all(
                    data.fields.map((field, index) =>
                        manager.save(CollectionField, {
                            ...field,
                            displayOrder: field.displayOrder ?? index,
                            collection: { id: collection.id }
                        })
                    )
                );
            }

            return this.getCollectionById(collection.id);
        });
    }

    // Read
    async getCollectionById(id: string): Promise<Collection> {
        const collection = await this.collectionRepository.findOne({
            where: { id },
            relations: ['fields']
        });

        if (!collection) {
            throw new NotFoundException(`Collection with ID "${id}" not found`);
        }

        return collection;
    }

    async getCollectionsByProject(projectId: string): Promise<Collection[]> {
        return await this.collectionRepository.find({
            where: { project: { id: projectId } },
            relations: ['fields'],
            order: { createdAt: 'DESC' }
        });
    }

    // Update
    async updateCollection(id: string, data: UpdateCollectionDTO): Promise<Collection> {
        const collection = await this.getCollectionById(id);
        await this.collectionRepository.update(id, data);
        return this.getCollectionById(id);
    }

    async updateField(collectionId: string, fieldId: string, data: UpdateFieldDTO): Promise<CollectionField> {
        const field = await this.fieldRepository.findOne({
            where: { id: fieldId, collection: { id: collectionId } }
        });

        if (!field) {
            throw new NotFoundException(`Field not found`);
        }

        await this.fieldRepository.update(fieldId, data);

        return this.fieldRepository.findOne({
            where: { id: fieldId },
            relations: ['collection']
        });
    }

    // Delete
    async deleteCollection(id: string): Promise<void> {
        const collection = await this.getCollectionById(id);
        await this.collectionRepository.remove(collection);
    }

    async deleteField(collectionId: string, fieldId: string): Promise<void> {
        const field = await this.fieldRepository.findOne({
            where: { id: fieldId, collection: { id: collectionId } }
        });

        if (!field) {
            throw new NotFoundException(`Field not found`);
        }

        await this.fieldRepository.remove(field);
    }
}
