import { DatabaseTags, ParticipationType, UserRole } from "@/common/constants";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({ database: DatabaseTags.SQL })
export class UserProject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ParticipationType })
    participationType: ParticipationType

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @ManyToOne(() => User, user => user.userProjects)
    user: User;

    @ManyToOne(() => Project, project => project.userProjects)
    project: Project;

}