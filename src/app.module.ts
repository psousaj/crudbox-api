import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from '@common/env/env.module';
import { InfraModule } from '@infra/infra.module';

import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    // Infra
    InfraModule
  ],
})
export class AppModule { }
