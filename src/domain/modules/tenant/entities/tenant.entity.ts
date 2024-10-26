import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { DatabaseTags } from "@/common/constants";
import { UserTenant } from "../../userTenant/entities/userTenant.entity";
import { Project } from "@domain/modules/project/entities/project.entity";

@Entity({ database: DatabaseTags.SQL })
export class Tenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    @IsNotEmpty()
    name: string;

    // Atualização: `@OneToMany` para `UserTenant`
    @OneToMany(() => UserTenant, userTenant => userTenant.tenant)
    users: UserTenant[];

    @OneToMany(() => Project, (project) => project.tenant)
    projects: Project[];
}
