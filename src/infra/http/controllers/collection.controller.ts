import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Collection } from '@/domain/entities/collection.entity';
import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CollectionsService } from '@/domain/services/collections.service';
import {
    CreateCollectionDTO,
    UpdateCollectionDTO,
    UpdateFieldDTO,
    createCollectionSchema,
    updateCollectionSchema,
} from '@/domain/dtos/collection.dto';
import { CollectionFieldType, UserRole } from '@/common/constants';
import { RequiredRoles } from '@/common/utils/decorators';

@ApiTags('collections')
@Controller('collections')
export class CollectionController {
    constructor(
        private readonly collectionsService: CollectionsService
    ) { }

    @RequiredRoles(UserRole.ADMIN)
    @Post()
    @ApiResponse({ status: 201, description: 'Coleção criada' })
    async createCollection(
        @Body(new ZodValidationPipe(createCollectionSchema)) data: CreateCollectionDTO,
        @Param('projectId') projectId: string
    ) {
        return this.collectionsService.createCollection(projectId, {
            ...data,
            fields: data.fields?.map(field => ({
                ...field,
                fieldType: field.type?.toUpperCase()
            }))
        });
    }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Coleção encontrada' })
    async getCollection(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.collectionsService.getCollectionById(id);
    }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get('project/:projectId')
    @ApiResponse({ status: 200, description: 'Lista de coleções do projeto' })
    async getProjectCollections(
        @Param('projectId', ParseUUIDPipe) projectId: string
    ) {
        return this.collectionsService.getCollectionsByProject(projectId);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Coleção atualizada' })
    async updateCollection(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(new ZodValidationPipe(updateCollectionSchema)) data: UpdateCollectionDTO
    ) {
        return this.collectionsService.updateCollection(id, {
            ...data,
            fields: data.fields?.map(field => ({
                ...field,
                fieldType: field.type?.toUpperCase()
            }))
        });
    }

    @RequiredRoles(UserRole.ADMIN)
    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Coleção removida' })
    async deleteCollection(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.collectionsService.deleteCollection(id);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Patch(':id/fields/:fieldId')
    @ApiResponse({ status: 200, description: 'Campo atualizado' })
    async updateField(
        @Param('id', ParseUUIDPipe) collectionId: string,
        @Param('fieldId', ParseUUIDPipe) fieldId: string,
        @Body() data: UpdateFieldDTO
    ) {
        return this.collectionsService.updateField(collectionId, fieldId, {
            ...data,
            type: data.type?.toUpperCase() as CollectionFieldType
        });
    }

    @RequiredRoles(UserRole.ADMIN)
    @Delete(':id/fields/:fieldId')
    @ApiResponse({ status: 204, description: 'Campo removido' })
    async deleteField(
        @Param('id', ParseUUIDPipe) collectionId: string,
        @Param('fieldId', ParseUUIDPipe) fieldId: string
    ) {
        return this.collectionsService.deleteField(collectionId, fieldId);
    }
}
