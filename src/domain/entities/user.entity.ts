import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Tenant } from "./tenant.entity";
import { UserTenant } from "./userTenant.entity";
import { DatabaseTags } from "@/helpers/constants";

@Entity({ database: DatabaseTags.SQL })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    @IsEmail({}, { message: 'Endereço de Emailerrado' })
    email: string

    @Column()
    @IsNotEmpty()
    password: string

    @ManyToMany(() => Tenant, tenant => tenant.users)
    @JoinTable({ name: 'user_tenant' })
    tenants: UserTenant[]

    // 
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}