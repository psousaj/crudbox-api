import { DatabaseTags, handleProvider, RepositoriesTag } from "@/common/constants";
import { CollectionRecordDocument } from "@/domain/entities/documents/collectionData.document";
import { Collection, CollectionField, CollectionRecord, CollectionRecordValue } from "../entities/collection.entity";

export const collectionRepositories = [
    handleProvider(RepositoriesTag.COLLECTION, Collection),
    handleProvider(RepositoriesTag.COLLECTION_FIELD, CollectionField),
    handleProvider(RepositoriesTag.COLLECTION_RECORD, CollectionRecord),
    handleProvider(RepositoriesTag.COLLECTION_RECORD_VALUE, CollectionRecordValue),
    handleProvider(RepositoriesTag.COLLECTION_RECORD_NOSQL, CollectionRecordDocument, DatabaseTags.NOSQL),
];
