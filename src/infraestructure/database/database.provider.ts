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
                    __dirname + '../../application/entities/*.entity{.ts,.js}',
                ],
                // synchronize: true
            })

            return dataSource.initialize();
        },
        inject: [EnvService],  // Injetando o EnvService
    },
    {
        provide: DatabaseTags.NOSQL,
        useFactory: async (env: EnvService) => {
            const dataSource = new DataSource({
                type: 'mongodb',
                url: `mongodb+srv://${env.get('MONGO_USER')}:${env.get('MONGO_PASSWORD')}@${env.get('MONGO_HOST')}/?retryWrites=true&w=majority&appName=${env.get('MONGO_APPNAME')}`,
                entities: [
                    __dirname + '../../domain/entities/*.entity{.ts,.js}',
                ],
            })

            return dataSource.initialize();
        },
        inject: [EnvService],  // Injetando o EnvService
    }
]