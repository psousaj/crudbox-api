import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from '@common/env/env.module';
import { InfraModule } from '@infra/infra.module';

import { envSchema } from './env';
import { APP_GUARD } from '@nestjs/core';
import { TenantRolesGuard } from '@common/guards/tenantRoles.guard';
import { AuthModule } from '@auth/auth.module';
import { JwtAuthGuard } from '@common/guards/jwtAuth.guard';
import { UserTenantService } from './domain/modules/userTenant/services/userTenant.service';
import { UserTenantModule } from './domain/modules/userTenant/userTenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    InfraModule,
    AuthModule,
    UserTenantModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: TenantRolesGuard,
    },
  ]
})
export class AppModule { }
