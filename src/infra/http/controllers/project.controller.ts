import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
// 
import { ProjectService } from '@/domain/modules/project/services/project.service';
import { Project } from '@/domain/modules/project/entities/project.entity';
import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateProjectDto, createProjectSchema } from '@/domain/modules/project/dto/project.dto';
import { UserRole } from '@/common/constants';
import { RequiredRoles } from '@/common/utils/decorators';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get()
    @ApiResponse({ status: 200, description: 'Lista de projetos' })
    async findAll(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @RequiredRoles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Projeto encontrado' })
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
        return this.projectService.findById(id);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Post()
    @ApiResponse({ status: 201, description: 'Projeto criado' })
    async create(@Body(new ZodValidationPipe(createProjectSchema)) createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Projeto atualizado' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(new ZodValidationPipe(createProjectSchema.partial())) updateProjectDto: Partial<CreateProjectDto>): Promise<Project> {
        return this.projectService.update(id, updateProjectDto);
    }

    @RequiredRoles(UserRole.ADMIN)
    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Projeto deletado' })
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.projectService.delete(id);
    }
}
