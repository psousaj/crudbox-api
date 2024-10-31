import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DatabaseTags } from "@/common/constants";
import { Project } from "@domain/modules/project/entities/project.entity";
import { DataItem } from "@domain/modules/dataItem/entities/dataItem.entity";

@Entity({ database: DatabaseTags.SQL })
export class Collection {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @ManyToOne(() => Project, (project) => project.collections, { onDelete: 'CASCADE', nullable: false })
    project: Project

    @OneToMany(() => DataItem, (d_i) => d_i.collection, { onDelete: 'CASCADE', nullable: true })
    items: DataItem

}

