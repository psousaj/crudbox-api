import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
// 
import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { User } from '@/domain/modules/user/entities/user.entity';
import { UserService } from '@/domain/modules/user/services/user.service';
import { CreateUserDto, createUserSchema } from '@/domain/modules/user/dto/user.dto';
import { UserRole } from '@/common/constants';
import { RequiredRoles } from '@/common/utils/decorators';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @RequiredRoles(UserRole.STAFF)
    @Get()
    @ApiResponse({ status: 200, description: 'Lista de usuários' })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @RequiredRoles(UserRole.STAFF, UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Usuário criado' })
    async create(@Body(new ZodValidationPipe(createUserSchema)) createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @RequiredRoles(UserRole.STAFF, UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Usuário atualizado' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(new ZodValidationPipe(createUserSchema.partial())) updateUserDto: Partial<CreateUserDto>): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @RequiredRoles(UserRole.STAFF, UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Usuário deletado' })
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.userService.delete(id);
    }

    @Put(':id/reactivate')
    @ApiResponse({ status: 200, description: 'Usuário reativado com sucesso.' })
    async reactivate(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
        return this.userService.reactivateUser(id);
    }
}
