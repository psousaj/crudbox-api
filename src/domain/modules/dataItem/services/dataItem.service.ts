import { ObjectId, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { DataItem } from "@domain/modules/dataItem/entities/dataItem.entity"
import { DataItemNOSQL } from "@domain/modules/dataItem/entities/dataItem.document"
import { RepositoriesTag } from "@/common/constants";

@Injectable()
export class DataItemService {
    constructor(
        @Inject(RepositoriesTag.DATA_ITEM)
        private dataItemRepository: Repository<DataItem>,

        // @Inject(RepositoriesTag.DATA_ITEM_NOSQL)
        // private dataItemNoSQLRepository: Repository<DataItemNOSQL>
    ) { }

    async findAll(): Promise<DataItem[]> {
        return this.dataItemRepository.find();
    }

    async findById(id: string): Promise<DataItem> {
        return this.dataItemRepository.findOneBy({ id });
    }

    async create(dataItemData: Partial<DataItem>): Promise<DataItem> {
        const dataItem = this.dataItemRepository.create(dataItemData);
        return this.dataItemRepository.save(dataItem);
    }

    async update(id: string, dataItemData: Partial<DataItem>): Promise<DataItem> {
        await this.dataItemRepository.update(id, dataItemData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.dataItemRepository.delete(id);
    }

    // async findAllNoSQL(): Promise<DataItemNOSQL[]> {
    //     return this.dataItemNoSQLRepository.find();
    // }
    // async findNoSQLById(id: string): Promise<DataItemNOSQL> {
    //     return this.dataItemNoSQLRepository.findOneBy({ id: new ObjectId(id) });
    // }

    // async createNoSQL(dataItemData: Partial<DataItemNOSQL>): Promise<DataItemNOSQL> {
    //     const dataItem = this.dataItemNoSQLRepository.create(dataItemData);
    //     return this.dataItemNoSQLRepository.save(dataItem);
    // }

    // async updateNoSQL(id: string, dataItemData: Partial<DataItemNOSQL>): Promise<DataItemNOSQL> {
    //     await this.dataItemNoSQLRepository.update(id, dataItemData);
    //     return this.findNoSQLById(id);
    // }

    // async deleteNoSQL(id: string): Promise<void> {
    //     await this.dataItemNoSQLRepository.delete(id);
    // }
}
