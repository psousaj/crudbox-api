import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tenant } from "./tenant.entity";
import { User } from "./user.entity";
import { DatabaseTags, UserRole } from "@/helpers/constants";

@Entity({ database: DatabaseTags.SQL })
export class UserTenant {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.tenants)
    user: User

    @ManyToOne(() => Tenant, tenant => tenant.users)
    tenant: Tenant

    @Column({
        type: 'enum',
        enum: UserRole
    })
    role: UserRole
}