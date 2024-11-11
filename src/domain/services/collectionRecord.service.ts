import { CollectionRecordValue } from "../entities/collection.entity";

@Injectable()
export class CollectionRecordsService {
    constructor(
        @Inject(RepositoriesTag.COLLECTION_RECORD)
        private readonly recordRepository: Repository<CollectionRecord>,
        @Inject(RepositoriesTag.COLLECTION_RECORD_VALUE)
        private readonly valueRepository: Repository<CollectionRecordValue>,
        @Inject(RepositoriesTag.COLLECTION_RECORD_NOSQL)
        private readonly noSQLRepository: Repository<CollectionDataNOSQL>,
        private readonly validationService: CollectionValidationService,
        private readonly collectionsService: CollectionsService
    ) { }

    // Create
    async createRecord(collectionId: string, data: Record<string, any>) {
        const schema = await this.validationService.generateSchemaForCollection(collectionId);
        const validatedData = await schema.parseAsync(data);

        return await this.recordRepository.manager.transaction(async (manager) => {
            const record = await manager.save(CollectionRecord, {
                collection: { id: collectionId }
            });

            const collection = await manager.findOne(Collection, {
                where: { id: collectionId },
                relations: ['fields']
            });

            const values = await Promise.all(
                collection.fields.map(field =>
                    manager.save(CollectionRecordValue, {
                        field: { id: field.id },
                        record: { id: record.id },
                        value: validatedData[field.name]?.toString() ?? null
                    })
                )
            );

            const noSQLDoc = await manager.save(CollectionDataNOSQL, {
                recordId: record.id,
                collectionId,
                values: collection.fields.map(field => ({
                    fieldId: field.id,
                    fieldName: field.name,
                    fieldType: field.fieldType,
                    value: validatedData[field.name]
                }))
            });

            await manager.update(CollectionRecord, record.id, {
                mongoDocId: noSQLDoc.id
            });

            return this.getRecordById(record.id);
        });
    }

    // Read
    async getRecordById(id: string) {
        const record = await this.recordRepository.findOne({
            where: { id },
            relations: ['values', 'values.field', 'collection']
        });

        if (!record) {
            throw new NotFoundException(`Record with ID "${id}" not found`);
        }

        return record;
    }

    async getRecords(
        collectionId: string,
        page: number = 1,
        limit: number = 10,
        filters?: Record<string, any>
    ) {
        const collection = await this.collectionsService.getCollectionById(collectionId);

        // Busca do MongoDB para performance
        const query: any = { collectionId };

        if (filters) {
            const schema = await this.validationService.generateSchemaForCollection(collectionId);
            const validatedFilters = await schema.partial().parseAsync(filters);

            Object.entries(validatedFilters).forEach(([key, value]) => {
                query[`values.${key}`] = value;
            });
        }

        const [records, total] = await this.noSQLRepository.findAndCount({
            where: query,
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' }
        });

        return {
            records,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }

    // Update
    async updateRecord(id: string, data: Record<string, any>) {
        const record = await this.getRecordById(id);
        const schema = await this.validationService.generateSchemaForCollection(record.collection.id);
        const validatedData = await schema.partial().parseAsync(data);

        return await this.recordRepository.manager.transaction(async (manager) => {
            // Atualiza valores SQL
            await manager.delete(CollectionRecordValue, { record: { id } });

            const values = await Promise.all(
                record.collection.fields.map(field =>
                    manager.save(CollectionRecordValue, {
                        field: { id: field.id },
                        record: { id },
                        value: validatedData[field.name]?.toString() ?? null
                    })
                )
            );

            // Atualiza documento NoSQL
            await manager.update(CollectionDataNOSQL, { recordId: id }, {
                values: record.collection.fields.map(field => ({
                    fieldId: field.id,
                    fieldName: field.name,
                    fieldType: field.fieldType,
                    value: validatedData[field.name]
                }))
            });

            return this.getRecordById(id);
        });
    }

    // Delete
    async deleteRecord(id: string): Promise<void> {
        const record = await this.getRecordById(id);

        await this.recordRepository.manager.transaction(async (manager) => {
            await manager.delete(CollectionDataNOSQL, { recordId: id });
            await manager.remove(record);
        });
    }

    // Bulk Operations
    async bulkDeleteRecords(collectionId: string, recordIds: string[]): Promise<void> {
        await this.recordRepository.manager.transaction(async (manager) => {
            await manager.delete(CollectionDataNOSQL, { recordId: In(recordIds) });
            await manager.delete(CollectionRecord, { id: In(recordIds) });
        });
    }
}