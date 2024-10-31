// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '@/domain/modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { EnvModule } from '@/common/env/env.module';
import { EnvService } from '@/common/env/env.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        EnvModule,
        JwtModule.registerAsync({
            inject: [EnvService],
            imports: [EnvModule],
            useFactory: (env: EnvService) => ({
                secret: env.get('JWT_SECRET') || 'defaultSecretKey',
                signOptions: { expiresIn: '1d' },
            })
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
