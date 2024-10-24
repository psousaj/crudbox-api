import { DataSource } from "typeorm";
import { DatabaseTags } from "@/helpers/constants";
import { EnvService } from "@/helpers/env/env.service";

export const databaseProviders = [
    {
        provide: DatabaseTags.SQL,
        useFactory: async (env: EnvService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: env.get("DB_HOST"),
                username: env.get("DB_USERNAME"),
                password: env.get("DB_PASSWORD"),
                database: env.get("DB_NAME"),
                ssl: true,
                entities: [
                    __dirname + '/../domain/entities/*.entity{.ts,.js}', // Corrigido caminho
                ],
                // synchronize: true // opcional, ativar apenas em desenvolvimento
            });

            return dataSource.initialize();
        },
        inject: [EnvService],
    },
    {
        provide: DatabaseTags.NOSQL,
        useFactory: async (env: EnvService) => {
            const dataSource = new DataSource({
                type: 'mongodb',
                url: env.get('MONGO_URL'),
                entities: [
                    __dirname + '/../domain/entities/*.entity{.ts,.js}',
                ],
            });

            return dataSource.initialize();
        },
        inject: [EnvService],
    }
];
