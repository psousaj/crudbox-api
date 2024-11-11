import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EntityRelationEvents, ParticipationType, UserRole } from '@/common/constants';
import { ProjectCreatedEvent } from './projectCreated.event';
import { UserProjectService } from '../services/userProject.service';

@Injectable()
export class ProjectEventListener implements OnModuleInit {
    constructor(
        private readonly userProjectService: UserProjectService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    onModuleInit() {
        this.eventEmitter.on(EntityRelationEvents.PROJECT, (event: ProjectCreatedEvent) => {
            this.handleProjectCreated(event);
        });
    }

    private async handleProjectCreated(event: ProjectCreatedEvent) {
        const { project, user } = event;

        await this.userProjectService.createUserProject({
            project,
            user,
            role: UserRole.ADMIN,
            participationType: ParticipationType.OWNER,
        });
    }
}
