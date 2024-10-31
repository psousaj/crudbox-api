import { User } from '@/domain/modules/user/entities/user.entity';
import { UserService } from '@/domain/modules/user/services/user.service';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            if (!user.isActive) {
                throw new UnauthorizedException('Usuário inativo. Por favor, reative sua conta.');
            }
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtService.sign(payload)
        return {
            access_token: token,
        };
    }

    async registerUser(userData: Partial<User>) {
        console.log(userData)
        if (userData.isStaff) {
            throw new ForbiddenException("Proibido definir usuários de Staff pela API")
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
        return this.userService.create(userData);
    }
}
