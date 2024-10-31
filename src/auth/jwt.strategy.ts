import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@/domain/modules/user/services/user.service';
import { EnvService } from '@/common/env/env.service';
import { User } from '@/domain/modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly envService: EnvService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envService.get('JWT_SECRET') || 'defaultSecretKey', // Obtenha a chave secreta diretamente aqui
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userService.findById(payload.sub);
        console.log("EXISTE USER PAYLOAD", payload)
        console.log("EXISTE USER", user)
        if (!user) {
            throw new UnauthorizedException();
        }
        console.log("VALIDANDO USER", user)
        return user;
    }
}
