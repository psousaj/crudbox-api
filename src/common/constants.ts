import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

enum RepositoriesTag {
    USER = 'USER_REPOSITORY',
    ORGANIZATION = 'ORGANIZATION_REPOSITORY',
    USER_ORGANIZATION = 'USER_ORGANIZATION_REPOSITORY',
    PROJECT = 'PROJECT_REPOSITORY',
    USER_PROJECT = 'USER_PROJECT_REPOSITORY',
    COLLECTION = 'COLLECTION_REPOSITORY',
    COLLECTION_SCHEMA = 'COLLECTION_SCHEMA_REPOSITORY',
    COLLECTION_FIELD = 'COLLECTION_FIELD',
    COLLECTION_RECORD = 'COLLECTION_RECORD',
    COLLECTION_RECORD_VALUE = 'COLLECTION_RECORD_VALUE',
    COLLECTION_RECORD_NOSQL = 'COLLECTION_DATA_NOSQL_REPOSITORY'
}

enum OrganizationType {
    PERSONAL_USER = 'PERSONAL_USER',
    COMPANY = 'COMPANY',
}

enum ParticipationType {
    OWNER = 'OWNER',
    GUEST = 'INVITED'
}

enum DatabaseTags {
    SQL = 'POSTGRES',
    NOSQL = 'MONGODB'
}

enum EntityRelationEvents {
    PROJECT = 'project.created',
}

enum CollectionFieldType {
    TEXT = 'text',
    IMAGE = 'image',
    NUMERIC = 'numeric',
    DATE = 'date',
    DATETIME = 'datetime',
}

enum UserRole {
    STAFF = 'is_staff',
    ADMIN = 'is_admin', // Acesso total às coleções e projetos
    EDITOR = 'is_editor', // Ver e editar dados das coleções existentes
    VIEWER = 'only_viewer', // Apenas ver os dados
}

function handleSQLRepositoryProvider(tag: string, entity: EntityTarget<ObjectLiteral>, dbTagToInject: string = DatabaseTags.SQL) {
    return {
        provide: tag,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
        inject: [dbTagToInject],
    }
}

export {
    RepositoriesTag,
    DatabaseTags,
    UserRole,
    EntityRelationEvents,
    CollectionFieldType,
    OrganizationType,
    ParticipationType,
    handleSQLRepositoryProvider as handleProvider
}
