import { UserRole } from "@/common/constants";
import { RequiredRoles } from "@/common/utils/decorators";
import { ZodValidationPipe } from "@/common/zod.validation.pipe";
import { UpdateFieldDTO, updateFieldSchema } from "@/domain/dtos/collection.dto";
import { CollectionField } from "@/domain/entities/collection.entity";
import { CollectionsService } from "@/domain/services/collections.service";
import { Body, Controller, Delete, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('collection-fields')
@Controller('collections/:collectionId/fields')
export class CollectionFieldController {
    constructor(private readonly collectionService: CollectionsService) { }

    @RequiredRoles(UserRole.ADMIN)
    @Put(':fieldId')
    @ApiResponse({ status: 200, description: 'Campo atualizado' })
    async updateField(
        @Param('collectionId', ParseUUIDPipe) collectionId: string,
        @Param('fieldId', ParseUUIDPipe) fieldId: string,
        @Body(new ZodValidationPipe(updateFieldSchema)) data: UpdateFieldDTO
    ): Promise<CollectionField> {
        return this.collectionService.updateField(collectionId, fieldId, data);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Delete(':fieldId')
    @ApiResponse({ status: 204, description: 'Campo removido' })
    async deleteField(
        @Param('collectionId', ParseUUIDPipe) collectionId: string,
        @Param('fieldId', ParseUUIDPipe) fieldId: string
    ): Promise<void> {
        return this.collectionService.deleteField(collectionId, fieldId);
    }
} 