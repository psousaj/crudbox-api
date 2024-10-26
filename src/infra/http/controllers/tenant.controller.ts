import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateTenantSchema, UpdateTenantSchema } from '@/domain/modules/tenant/dto/tenant.dto';
import { Tenant } from '@/domain/modules/tenant/entities/tenant.entity';
import { TenantService } from '@/domain/modules/tenant/services/tenant.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('tenants')
@Controller('tenants')
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de inquilinos' })
    async findAll(): Promise<Tenant[]> {
        return this.tenantService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Inquilino encontrado' })
    async findById(@Param('id') id: string): Promise<Tenant> {
        return this.tenantService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Inquilino criado' })
    async create(@Body(new ZodValidationPipe(CreateTenantSchema)) createTenantDto: any): Promise<Tenant> {
        return this.tenantService.create(createTenantDto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Inquilino atualizado' })
    async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateTenantSchema)) updateTenantDto: any): Promise<Tenant> {
        return this.tenantService.update(id, updateTenantDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Inquilino deletado' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.tenantService.delete(id);
    }
}
