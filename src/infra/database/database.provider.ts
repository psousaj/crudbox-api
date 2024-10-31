import { DataSource } from "typeorm";
import { DatabaseTags } from "@/common/constants";
import { EnvService } from "@/common/env/env.service";

export const dataSourcesProviders = [
    {
        provide: DatabaseTags.SQL,
        useFactory: async (env: EnvService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: env.get("DB_HOST"),
                username: env.get("DB_USERNAME"),
                password: env.get("DB_PASSWORD"),
                database: env.get("DB_NAME"),
                entities: [__dirname + '/../../domain/modules/*/entities/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
                ssl: true,
                synchronize: true
            });
            const ds = dataSource.initialize();
            return ds
        },
        inject: [EnvService],
    },
    // {
    //     provide: DatabaseTags.NOSQL,
    //     useFactory: async (env: EnvService) => {
    //         const dataSource = new DataSource({
    //             type: 'mongodb',
    //             url: env.get('MONGO_URL'),
    //             entities: [__dirname + '/../../domain/modules/*/entities/*.document{.ts,.js}'],
    //             ssl: true,
    //         });

    //         const ds = await dataSource.initialize();
    //         return ds
    //     },
    //     inject: [EnvService],
    // }
]


