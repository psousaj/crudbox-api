import { DatabaseTags, handleProvider, RepositoriesTag } from "@/helpers/constants";
import { Collection, CollectionNOSQL } from "../entities/collection.entity";

export const collectionProviders = [
    handleProvider(RepositoriesTag.COLLECTION, Collection),
    handleProvider(RepositoriesTag.COLLECTION_NOSQL, CollectionNOSQL, DatabaseTags.NOSQL)
];
