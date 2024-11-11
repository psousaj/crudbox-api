import { User } from "@domain/entities/user.entity";
import { Project } from "@domain/entities/project.entity";

export class ProjectCreatedEvent {
    constructor(
        public readonly project: Project,
        public readonly user: User,
    ) { }
}
