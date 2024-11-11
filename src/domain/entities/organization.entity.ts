import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { DatabaseTags, OrganizationType } from "@/common/constants";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({ database: DatabaseTags.SQL })
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    name: string;

    @Column({
        type: 'enum',
        enum: OrganizationType,
        nullable: false
    })
    organizationType: OrganizationType

    @OneToOne(() => User, user => user.organization)
    ownerId: User

    @OneToMany(() => Project, project => project.organization)
    projects: Project[]
}
