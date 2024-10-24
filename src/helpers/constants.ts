import { User } from "@/domain/entities/user.entity";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

enum RepositoriesTag {
    USER = 'USER_REPOSITORY',
    TENANT = 'TENANT_REPOSITORY',
    USER_TENANT = 'USER_TENANT_REPOSITORY',
    PROJECT = 'PROJECT_REPOSITORY',
    COLLECTION = 'COLLECTION_REPOSITORY',
    DATA_ITEM = 'DATA_ITEM_REPOSITORY',
    COLLECTION_NOSQL = 'COLLECTION_NOSQL_REPOSITORY',
    DATA_ITEM_NOSQL = 'DATA_ITEM_NOSQL_REPOSITORY'
}

enum DatabaseTags {
    SQL = 'DATA_SOURCE',
    NOSQL = 'PROJECTS_SOURCE'
}

enum UserRole {
    ADMIN = 'admin', // Acesso total às coleções e projetos
    EDITOR = 'editor', // Ver e editar dados das coleções existentes
    VIEWER = 'viewer', // Apenas ver os dados
}

function handleSQLRepositoryProvider(tag: string, entity: EntityTarget<ObjectLiteral>, dbTagToInject: string = DatabaseTags.SQL) {
    return {
        provide: tag,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
        inject: [dbTagToInject],
    }
}

export {
    RepositoriesTag, DatabaseTags, UserRole, handleSQLRepositoryProvider as handleProvider
}
