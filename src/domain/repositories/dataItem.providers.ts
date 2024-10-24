import { DatabaseTags, handleProvider, RepositoriesTag } from "@/helpers/constants";
import { DataItem, DataItemNOSQL } from "../entities/dataItem.entity";

export const dataItemProviders = [
    handleProvider(RepositoriesTag.DATA_ITEM, DataItem),
    handleProvider(RepositoriesTag.DATA_ITEM_NOSQL, DataItemNOSQL, DatabaseTags.NOSQL),
]
