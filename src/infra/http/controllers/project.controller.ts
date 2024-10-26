import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateProjectSchema, UpdateProjectSchema } from '@/domain/modules/project/dto/project.dto';
import { Project } from '@/domain/modules/project/entities/project.entity';
import { ProjectService } from '@/domain/modules/project/services/project.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de projetos' })
    async findAll(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Projeto encontrado' })
    async findById(@Param('id') id: string): Promise<Project> {
        return this.projectService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Projeto criado' })
    async create(@Body(new ZodValidationPipe(CreateProjectSchema)) createProjectDto: any): Promise<Project> {
        return this.projectService.create(createProjectDto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Projeto atualizado' })
    async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateProjectSchema)) updateProjectDto: any): Promise<Project> {
        return this.projectService.update(id, updateProjectDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Projeto deletado' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.projectService.delete(id);
    }
}
