import { DatabaseTags, handleProvider, RepositoriesTag } from "@/common/constants";
import { DataItem } from "@domain/modules/dataItem/entities/dataItem.entity";
import { DataItemNOSQL } from "@domain/modules/dataItem/entities/dataItem.document";

export const dataItemRepositories = [
    handleProvider(RepositoriesTag.DATA_ITEM, DataItem),
    // handleProvider(RepositoriesTag.DATA_ITEM_NOSQL, DataItemNOSQL, DatabaseTags.NOSQL),
]
