import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserTenantService } from '@/domain/modules/userTenant/services/userTenant.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserRole } from '@/common/constants';
import { TenantCreatedEvent } from './tenantCreated.event';

@Injectable()
export class TenantEventListener implements OnModuleInit {
    constructor(
        private readonly userTenantService: UserTenantService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    onModuleInit() {
        // Subscrição ao evento tenant.created
        this.eventEmitter.on('tenant.created', (event: TenantCreatedEvent) => {
            this.handleTenantCreated(event);
        });
    }

    // Função chamada quando o evento é disparado
    private async handleTenantCreated(event: TenantCreatedEvent) {
        const { tenant, user } = event;

        await this.userTenantService.create({
            user,
            tenant,
            role: UserRole.ADMIN // Define um papel padrão para o usuário criador do tenant
        });
    }
}
