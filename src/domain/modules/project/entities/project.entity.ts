import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { DatabaseTags } from "@/common/constants";
import { Tenant } from "@domain/modules/tenant/entities/tenant.entity";
import { Collection } from "@domain/modules/collection/entities/collection.entity";

@Entity({ database: DatabaseTags.SQL })
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    name: string

    @ManyToOne(() => Tenant, (tenant) => tenant.projects, { onDelete: 'CASCADE', nullable: false })
    tenant: Tenant

    @OneToMany(() => Collection, (collection) => collection.project, { onDelete: 'CASCADE', nullable: true })
    collections: Collection[]
}