import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Tenant } from "./tenant.entity";
import { Collection } from "./collection.entity";
import { DatabaseTags } from "@/helpers/constants";

@Entity({ database: DatabaseTags.SQL })
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    name: string

    @ManyToOne(() => Tenant, (tenant) => tenant.projects, { onDelete: 'CASCADE' })
    tenant: Tenant

    @OneToMany(() => Collection, (collection) => collection.project)
    collections: Collection[]
}