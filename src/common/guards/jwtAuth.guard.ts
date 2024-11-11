import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@common/utils/decorators';
import { User } from '@/domain/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        const ctx = context.switchToHttp();
        return ctx.getRequest();
    }

    handleRequest<TUser = User>(err: unknown, user: TUser, info: unknown, context: ExecutionContext, status?: unknown): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user; // Aqui, o usuário autenticado é retornado e tipado como TUser
    }
}
