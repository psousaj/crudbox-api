import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { DatabaseTags } from "@/common/constants";
import { Collection } from "@/domain/entities/collection.entity";
import { UserProject } from "./userProject.entity";
import { Organization } from "./organization.entity";

@Entity({ database: DatabaseTags.SQL })
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    name: string

    @Column()
    description: string

    @ManyToOne(() => Organization, organization => organization.projects)
    organization: Organization

    @OneToMany(() => Collection, collection => collection.project, { onDelete: 'CASCADE', nullable: true })
    collections: Collection[]

    @OneToMany(() => UserProject, userProject => userProject.project)
    userProjects: UserProject[]

}