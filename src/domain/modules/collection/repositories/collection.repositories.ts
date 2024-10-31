import { DatabaseTags, handleProvider, RepositoriesTag } from "@/common/constants";
import { Collection } from "@domain/modules/collection/entities/collection.entity";
import { CollectionNOSQL } from "@domain/modules/collection/entities/collection.document";

export const collectionRepositories = [
    handleProvider(RepositoriesTag.COLLECTION, Collection),
    // handleProvider(RepositoriesTag.COLLECTION_NOSQL, CollectionNOSQL, DatabaseTags.NOSQL)
];
