import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { PrimitiveType } from "@domain/modules/dataItem/entities/dataItem.entity";
import { DatabaseTags } from "@/common/constants";

@Entity({ database: DatabaseTags.NOSQL })
export class DataItemNOSQL {

    @ObjectIdColumn()
    id: ObjectId

    @Column('text')
    data: string;

    @Column({ type: 'enum', enum: PrimitiveType })
    primitive_type: PrimitiveType;

    // Se você precisar saber a qual coleção um DataItem pertence, adicione um campo collectionId
    @Column({ type: 'string', nullable: true }) // nullable se você quiser permitir que um DataItem não tenha coleção
    collection_id: ObjectId;

}