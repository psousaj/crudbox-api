import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateCollectionSchema, UpdateCollectionSchema } from '@/domain/modules/collection/dto/collection.dto';
import { Collection } from '@/domain/modules/collection/entities/collection.entity';
import { CollectionService } from '@/domain/modules/collection/services/collection.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('collections')
@Controller('collections')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de coleções' })
    async findAll(): Promise<Collection[]> {
        return this.collectionService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Coleção encontrada' })
    async findById(@Param('id') id: string): Promise<Collection> {
        return this.collectionService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Coleção criada' })
    async create(@Body(new ZodValidationPipe(CreateCollectionSchema)) createCollectionDto: any): Promise<Collection> {
        return this.collectionService.create(createCollectionDto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Coleção atualizada' })
    async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateCollectionSchema)) updateCollectionDto: any): Promise<Collection> {
        return this.collectionService.update(id, updateCollectionDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Coleção deletada' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.collectionService.delete(id);
    }
}
