import { Module } from '@nestjs/common';
import { DatabaseModule } from './infraestructure/database/database.module'; // Certifique-se de apontar para o caminho correto
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { EnvModule } from './helpers/env/env.module';
import { UserService } from './domain/services/user.service';
import { ProjectService } from './domain/services/project.service';
import { UserTenantService } from './domain/services/userTenant.service';
import { DataItemService } from './domain/services/dataItem.service';
import { CollectionService } from './domain/services/collection.service';
import { TenantService } from './domain/services/tenant.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
  ],
  providers: [
    UserService,
    ProjectService,
    UserTenantService,
    DataItemService,
    CollectionService,
    TenantService,
  ],
})
export class AppModule { }
