import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { DatabaseTags } from "@/common/constants";
import { UserTenant } from "../../userTenant/entities/userTenant.entity";

@Entity({ database: DatabaseTags.SQL })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Endereço de Email inválido' })
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isStaff: boolean;

    // Atualização: `@OneToMany` para `UserTenant`
    @OneToMany(() => UserTenant, userTenant => userTenant.user)
    tenants: UserTenant[];

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
