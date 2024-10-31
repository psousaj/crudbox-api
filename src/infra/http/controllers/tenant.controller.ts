import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, Request } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
// 
import { TenantService } from '@/domain/modules/tenant/services/tenant.service';
import { Tenant } from '@/domain/modules/tenant/entities/tenant.entity';
import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateTenantDto, createTenantSchema } from '@/domain/modules/tenant/dto/tenant.dto';
import { UserRole } from '@/common/constants';
import { RequiredRoles } from '@/common/utils/decorators';

@ApiTags('tenants')
@Controller('tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @RequiredRoles(UserRole.ADMIN)
    @Get()
    @ApiResponse({ status: 200, description: 'Lista de inquilinos' })
    async findAll(): Promise<Tenant[]> {
        return this.tenantService.findAll();
    }

    @RequiredRoles(UserRole.ADMIN)
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Inquilino encontrado' })
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Tenant> {
        return this.tenantService.findById(id);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Post()
    @ApiResponse({ status: 201, description: 'Inquilino criado' })
    async create(@Body(new ZodValidationPipe(createTenantSchema)) createTenantDto: CreateTenantDto, @Request() req: any): Promise<Tenant> {
        const userId = req.user.id; // Obtém o userId do objeto de requisição
        return this.tenantService.create(createTenantDto, userId);
    }
    @RequiredRoles(UserRole.ADMIN)
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Inquilino atualizado' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(new ZodValidationPipe(createTenantSchema.partial())) updateTenantDto: Partial<CreateTenantDto>): Promise<Tenant> {
        return this.tenantService.update(id, updateTenantDto);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Inquilino deletado' })
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.tenantService.delete(id);
    }
}
