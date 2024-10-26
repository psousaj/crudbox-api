import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateUserTenantSchema, UpdateUserTenantSchema } from '@/domain/modules/userTenant/dto/userTenant.dto';
import { UserTenant } from '@/domain/modules/userTenant/entities/userTenant.entity';
import { UserTenantService } from '@/domain/modules/userTenant/services/userTenant.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('user-tenants')
@Controller('user-tenants')
export class UserTenantController {
    constructor(private readonly userTenantService: UserTenantService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de inquilinos de usuários' })
    async findAll(): Promise<UserTenant[]> {
        return this.userTenantService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Inquilino de usuário encontrado' })
    async findById(@Param('id') id: string): Promise<UserTenant> {
        return this.userTenantService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Inquilino de usuário criado' })
    async create(@Body(new ZodValidationPipe(CreateUserTenantSchema)) createUserTenantDto: any): Promise<UserTenant> {
        return this.userTenantService.create(createUserTenantDto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Inquilino de usuário atualizado' })
    async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateUserTenantSchema)) updateUserTenantDto: any): Promise<UserTenant> {
        return this.userTenantService.update(id, updateUserTenantDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Inquilino de usuário deletado' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.userTenantService.delete(id);
    }
}
