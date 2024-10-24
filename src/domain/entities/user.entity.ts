import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Tenant } from "./tenant.entity";
import { UserTenant } from "./userTenant.entity";
import { DatabaseTags, handleProvider, RepositoriesTag } from "@/helpers/constants";
import { Collection, CollectionNOSQL } from "../entities/collection.entity";

@Entity({ database: DatabaseTags.SQL })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    @IsEmail({}, { message: 'Endereço de Email inválido' })
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

export const collectionProviders = [
    handleProvider(RepositoriesTag.COLLECTION, Collection),
    handleProvider(RepositoriesTag.COLLECTION_NOSQL, CollectionNOSQL, DatabaseTags.NOSQL)
];

