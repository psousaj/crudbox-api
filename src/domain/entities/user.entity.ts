import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { DatabaseTags } from "@/common/constants";
import { Organization } from "./organization.entity";
import { UserProject } from "./userProject.entity";

@Entity({ database: DatabaseTags.SQL })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Endereço de Email inválido' })
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isStaff: boolean;

    @OneToOne(() => Organization, organization => organization.ownerId)
    organization: Organization;

    @OneToMany(() => UserProject, userProject => userProject.user)
    userProjects: UserProject[];

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
