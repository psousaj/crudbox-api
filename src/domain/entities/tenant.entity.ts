import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { DatabaseTags } from "@/helpers/constants";

@Entity({ database: DatabaseTags.SQL })
export class Tenant {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    name: string

    @ManyToMany(() => User, user => user.tenants)
    users: User[]

    @OneToMany(() => Project, (project) => project.tenant)
    projects: Project[]
}