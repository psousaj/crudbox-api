import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { CollectionFieldType, DatabaseTags } from "@/common/constants";
import { Project } from "@/domain/entities/project.entity";


@Entity({ database: DatabaseTags.SQL })
export class Collection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Project, (project) => project.collections, {
        onDelete: 'CASCADE',
        nullable: false
    })
    project: Project;

    @OneToMany(() => CollectionField, field => field.collection)
    fields: CollectionField[];

    @OneToMany(() => CollectionRecord, record => record.collection)
    records: CollectionRecord[];
}

@Entity({ database: DatabaseTags.SQL })
export class CollectionField {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({
        type: 'enum',
        enum: CollectionFieldType,
        nullable: false
    })
    fieldType: CollectionFieldType;

    @Column({ default: false })
    required: boolean;

    @Column({ default: false })
    unique: boolean;

    @Column({ nullable: true })
    defaultValue: string;

    @Column({ type: 'json', nullable: true })
    validations: any;

    @Column({ type: 'int', default: 0 })
    displayOrder: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Collection, collection => collection.fields, {
        onDelete: 'CASCADE',
        nullable: false
    })
    collection: Collection;

    @OneToMany(() => CollectionRecordValue, value => value.field)
    values: CollectionRecordValue[];
}

@Entity({ database: DatabaseTags.SQL })
export class CollectionRecord {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    mongoDocId?: string;

    @ManyToOne(() => Collection, collection => collection.records, {
        onDelete: 'CASCADE',
        nullable: false
    })
    collection: Collection;

    @OneToMany(() => CollectionRecordValue, value => value.record)
    values: CollectionRecordValue[];
}

@Entity({ database: DatabaseTags.SQL })
export class CollectionRecordValue {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    value: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => CollectionField, field => field.values, {
        onDelete: 'CASCADE',
        nullable: false
    })
    field: CollectionField;

    @ManyToOne(() => CollectionRecord, record => record.values, {
        onDelete: 'CASCADE',
        nullable: false
    })
    record: CollectionRecord;

    @BeforeInsert()
    @BeforeUpdate()
    serializeValue() {
        this.value = this.serialize(this.value, this.field.fieldType);
    }

    private serialize(value: any, type: CollectionFieldType): string {
        switch (type) {
            case CollectionFieldType.TEXT:
                return value.toString();
            case CollectionFieldType.IMAGE:
                return value; // URL ou caminho da imagem
            case CollectionFieldType.NUMERIC:
                return value.toString();
            case CollectionFieldType.DATE:
            case CollectionFieldType.DATETIME:
                return value instanceof Date ? value.toISOString() : value;
            default:
                throw new Error('Tipo de dado não suportado para serialização');
        }
    }

    deserializeValue(): any {
        return this.deserialize(this.value, this.field.fieldType);
    }

    private deserialize(value: string, type: CollectionFieldType): any {
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