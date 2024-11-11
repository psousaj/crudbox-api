import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { CollectionFieldType, DatabaseTags } from '@/common/constants';

interface CollectionRecordValue {
    fieldId: string;
    fieldName: string;
    fieldType: CollectionFieldType;
    value: any;
}

@Entity({ database: DatabaseTags.NOSQL })
export class CollectionRecordDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ name: 'record_id', type: 'uuid' })
    recordId: string;

    @Column({ name: 'mongo_doc_id', nullable: true })
    mongoDocId?: string;

    @Index()
    @Column({ name: 'collection_id', type: 'uuid' })
    collectionId: string;

    @Column({ type: 'jsonb' })
    values: CollectionRecordValue[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    deserialize(): { [key: string]: any } {
        const result: { [key: string]: any } = {};

        this.values.forEach(value => {
            result[value.fieldName] = this.deserializeValue(value.value, value.fieldType);
        });

        return result;
    }

    private deserializeValue(value: any, type: CollectionFieldType): any {
        switch (type) {
            case CollectionFieldType.TEXT:
                return value;
            case CollectionFieldType.IMAGE:
                return value;
            case CollectionFieldType.NUMERIC:
                return Number(value);
            case CollectionFieldType.DATE:
            case CollectionFieldType.DATETIME:
                return new Date(value);
            default:
                throw new Error('Tipo de dado não suportado para desserialização');
        }
    }
}