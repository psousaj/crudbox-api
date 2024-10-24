import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from './project.entity'
import { DataItem, DataItemNOSQL } from "./dataItem.entity";
import { DatabaseTags } from "@/helpers/constants";

@Entity({ database: DatabaseTags.SQL })
export class Collection {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @ManyToOne(() => Project, (project) => project.collections, { onDelete: 'CASCADE' })
    project: Project

    @OneToMany(() => DataItem, (d_i) => d_i.collection)
    items: DataItem

}


@Entity({ database: DatabaseTags.NOSQL })
export class CollectionNOSQL {

    @ObjectIdColumn()
    id: ObjectId

    @Column({ nullable: false })
    name: string

    @Column(() => Project)
    project: Project

    @Column(() => DataItemNOSQL)
    items: DataItemNOSQL

}