import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { DatabaseTags, UserRole } from "@/common/constants";
import { User } from "@domain/modules/user/entities/user.entity";
import { Tenant } from "@domain/modules/tenant/entities/tenant.entity";

@Entity({ database: DatabaseTags.SQL })
export class UserTenant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.tenants)
    user: User;

    @ManyToOne(() => Tenant, tenant => tenant.users)
    tenant: Tenant;

    @Column({
        type: 'enum',
        enum: UserRole
    })
    role: UserRole;
}
