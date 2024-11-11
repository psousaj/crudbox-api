// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@/common/zod.validation.pipe';
import { loginSchema, registerSchema } from './auth.schemas';
import { CreateUserDto } from '@/domain/modules/user/dto/user.dto';
import { IsPublic } from '@/common/utils/decorators';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @Post('register')
    async register(@Body(new ZodValidationPipe(registerSchema)) createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @IsPublic()
    @Post('login')
    async login(@Body(new ZodValidationPipe(loginSchema)) { email, password }) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }
        return this.authService.login(user);
    }

    @Post('logout')
    async logout(@Request() req: any) {
        return req.logout();
    }
}
