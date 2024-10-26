import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { DataItemNOSQL } from "@domain/modules/dataItem/entities/dataItem.document";
import { DatabaseTags } from "@/common/constants";

@Entity({ database: DatabaseTags.NOSQL })
export class CollectionNOSQL {

    @ObjectIdColumn()
    id: ObjectId

    @Column({ nullable: false })
    name: string

    @Column({ type: 'string', nullable: false })
    project_id: string

    // Usando um array para armazenar múltiplos DataItemNOSQL
    @Column(() => DataItemNOSQL)
    items: DataItemNOSQL[];

}