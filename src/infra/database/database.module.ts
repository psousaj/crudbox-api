
import { Module } from '@nestjs/common';
import { dataSourcesProviders } from './database.provider';
import { EnvService } from '@/common/env/env.service';

@Module({
    providers: [
        EnvService,
        ...dataSourcesProviders,
    ],
    exports: [...dataSourcesProviders],
})
export class DatabaseModule { }
