import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DatabaseTags } from '@/common/constants';

@Entity({ database: DatabaseTags.NOSQL })
export class CollectionSchemaDocument {
    @ObjectIdColumn()
    _id: string;

    @Column()
    collectionId: string;

    @Column('json')
    validationSchema: Record<string, any>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 