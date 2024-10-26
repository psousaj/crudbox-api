import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { CreateUserSchema, UpdateUserSchema } from '@/domain/modules/user/dto/user.dto';
import { User } from '@/domain/modules/user/entities/user.entity';
import { UserService } from '@/domain/modules/user/services/user.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de usuários' })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    async findById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Usuário criado' })
    async create(@Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: any): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: 'Usuário atualizado' })
    async update(@Param('id') id: string, @Body(new ZodValidationPipe(UpdateUserSchema)) updateUserDto: any): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Usuário deletado' })
    async delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
