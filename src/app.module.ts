import { Module } from '@nestjs/common';
import { DatabaseModule } from './infraestructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { EnvModule } from './helpers/env/env.module';
import { UsersService } from './users/users.service';
import { UserService } from './domain/services/user/user.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [UsersService, UserService],
})
export class AppModule { }
