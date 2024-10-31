import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
// 
import { CreateCollectionDto, createCollectionSchema } from '@/domain/modules/collection/dto/collection.dto';
import { Collection } from '@/domain/modules/collection/entities/collection.entity';
import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CollectionService } from '@/domain/modules/collection/services/collection.service';
import { RequiredRoles } from '@/common/utils/decorators';
import { UserRole } from '@/common/constants';

@ApiTags('collections')
@Controller('collections')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get()
    @ApiResponse({ status: 200, description: 'Lista de coleções' })
    async findAll(): Promise<Collection[]> {
        return this.collectionService.findAll();
    }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Coleção encontrada' })
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Collection> {
        return this.collectionService.findById(id);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Post()
    @ApiResponse({ status: 201, description: 'Coleção criada' })
    async create(@Body(new ZodValidationPipe(createCollectionSchema)) createCollectionDto: CreateCollectionDto): Promise<Collection> {
        return this.collectionService.create(createCollectionDto);
    }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR)
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Coleção atualizada' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(new ZodValidationPipe(createCollectionSchema.partial())) updateCollectionDto: Partial<CreateCollectionDto>): Promise<Collection> {
        return this.collectionService.update(id, updateCollectionDto);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Coleção deletada' })
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.collectionService.delete(id);
    }
}
