import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { Collection, CollectionNOSQL } from "./collection.entity";
import { DatabaseTags } from "@/helpers/constants";

enum PrimitiveType {
    TEXT = 'text',
    IMAGE = 'image',
    NUMERIC = 'numeric',
    DATE = 'date',
    DATETIME = 'datetime',
}

@Entity({ database: DatabaseTags.SQL })
export class DataItem {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    data: string;

    @Column({ type: 'enum', enum: PrimitiveType })
    primitive_type: PrimitiveType;

    @ManyToOne(() => Collection, (collection) => collection.items, { onDelete: 'CASCADE' })
    collection: Collection

    // Antes de inserir ou atualizar, serializa o dado para o banco de dados
    @BeforeInsert()
    @BeforeUpdate()
    serializeData() {
        this.data = this.serialize(this.data, this.primitive_type);
    }

    // Serialização: transforma o valor em uma string para ser salvo no banco
    private serialize(value: any, type: PrimitiveType): string {
        switch (type) {
            case 'text':
                return value.toString();
            case 'image':
                return value;  // URL ou caminho da imagem
            case 'numeric':
                return value.toString();  // Converte números para string
            case 'date':
            case 'datetime':
                return (value instanceof Date) ? value.toISOString() : value;
            default:
                throw new Error('Tipo de dado não suportado para serialização');
        }
    }

    // Após recuperar o valor do banco, desserializa de volta para o tipo correto
    deserializeData(): any {
        return this.deserialize(this.data, this.primitive_type);
    }

    // Desserialização: converte a string salva no banco para o tipo correto
    private deserialize(value: string, type: PrimitiveType): any {
        switch (type) {
            case 'text':
                return value;
            case 'image':
                return value;  // Mantém como string (URL ou caminho)
            case 'numeric':
                return Number(value);  // Converte para número
            case 'date':
            case 'datetime':
                return new Date(value);  // Converte para Date
            default:
                throw new Error('Tipo de dado não suportado para desserialização');
        }
    }

}

@Entity({ database: DatabaseTags.NOSQL })
export class DataItemNOSQL {

    @ObjectIdColumn()
    id: ObjectId

    @Column('text')
    data: string;

    @Column({ type: 'enum', enum: PrimitiveType })
    primitive_type: PrimitiveType;

    @Column(() => CollectionNOSQL)
    collection: CollectionNOSQL

}