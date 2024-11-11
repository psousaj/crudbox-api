import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { z } from "zod";
import { CollectionFieldType, RepositoriesTag } from "@/common/constants";
import { Collection } from "../entities/collection.entity";
import { CollectionSchemaDocument } from "../entities/documents/collectionSchema.document";

@Injectable()
export class CollectionValidationService {
    constructor(
        @Inject(RepositoriesTag.COLLECTION)
        private readonly collectionRepository: Repository<Collection>,
        @Inject(RepositoriesTag.COLLECTION_SCHEMA)
        private readonly schemaRepository: Repository<CollectionSchemaDocument>
    ) { }

    private schemaCache: Map<string, z.ZodObject<any>> = new Map();

    async generateAndSaveSchema(collectionId: string): Promise<void> {
        const schema = await this.generateSchemaForCollection(collectionId);

        const schemaDoc = this.schemaRepository.create({
            collectionId,
            validationSchema: schema,
        });

        await this.schemaRepository.save(schemaDoc);
        this.schemaCache.set(collectionId, schema);
    }

    async generateSchemaForCollection(collectionId: string): Promise<z.ZodObject<any>> {
        const cached = this.schemaCache.get(collectionId);
        if (cached) return cached;

        const collection = await this.collectionRepository.findOne({
            where: { id: collectionId },
            relations: ['fields']
        });

        if (!collection) {
            throw new Error('Collection not found');
        }

        const schemaObj: Record<string, z.ZodTypeAny> = {};

        collection.fields.forEach(field => {
            let fieldSchema: z.ZodTypeAny;

            switch (field.fieldType) {
                case CollectionFieldType.TEXT:
                    fieldSchema = z.string();
                    break;
                case CollectionFieldType.NUMERIC:
                    fieldSchema = z.number();
                    break;
                case CollectionFieldType.IMAGE:
                    fieldSchema = z.string().regex(/^data:image\/[a-zA-Z]+;base64,/);
                    break;
                case CollectionFieldType.DATE:
                case CollectionFieldType.DATETIME:
                    fieldSchema = z.string().datetime();
                    break;
            }

            if (!field.required) {
                fieldSchema = fieldSchema.optional();
            }

            schemaObj[field.name] = fieldSchema;
        });

        const schema = z.object(schemaObj);
        return schema;
    }

    async getSchema(collectionId: string): Promise<z.ZodObject<any>> {
        const cached = this.schemaCache.get(collectionId);
        if (cached) return cached;

        const schemaDoc = await this.schemaRepository.findOne({
            where: { collectionId }
        });

        if (schemaDoc) {
            const schema = z.object(schemaDoc.validationSchema);
            this.schemaCache.set(collectionId, schema);
            return schema;
        }

        await this.generateAndSaveSchema(collectionId);
        return this.schemaCache.get(collectionId)!;
    }

    invalidateSchema(collectionId: string) {
        this.schemaCache.delete(collectionId);
    }
}
