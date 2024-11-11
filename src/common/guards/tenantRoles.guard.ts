import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@common/constants';
import { ROLES_KEY } from '@common/utils/decorators';
import { UserTenantService } from '@/domain/services/userTenant.service';
import { User } from '@/domain/entities/user.entity';

@Injectable()
export class TenantRolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userTenantService: UserTenantService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest<{ user: User, route: any, method: any, params: any, body: any }>();
        const user = request.user;  // Usuário autenticado pelo JwtAuthGuard
        const routePath = request.route?.path;  // Captura o caminho da rota atual
        const method = request.method;  // Captura o método HTTP (GET, POST, etc.)

        if (!user) return false;  // Negar acesso se o usuário não estiver autenticado

        let tenantId: string | null = null;

        if (routePath.includes('/collections')) {
            // Exemplo de obtenção do tenantId para rota relacionada a Collection
            const collectionId = request.body?.collectionId;
            const project = await this.userTenantService.getProjectByCollection(collectionId);
            tenantId = project?.tenant.id;
        } else if (routePath.includes('/projects')) {
            // Exemplo para rota de Project
            const projectId = request.params.projectId;
            tenantId = (await this.userTenantService.getTenantByProject(projectId)).id;
        } else if (user) {
            return true;
        }

        // if (!tenantId) return false;  // Negar acesso se não for possível determinar o tenant

        console.log(`Usuário ${user.email} acessando tenant ${tenantId} na rota ${routePath}`);

        // Verifique se o usuário possui as permissões necessárias para o tenant atual
        const hasRequiredRole = await this.userTenantService.hasUserRoleForTenant(user.id, tenantId, requiredRoles);

        return hasRequiredRole;  // Retorna true se o usuário possui o papel necessário, caso contrário, false
    }
}
