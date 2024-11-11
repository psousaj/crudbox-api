import { Repository } from 'typeorm';
import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { RepositoriesTag } from '@/common/constants';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(RepositoriesTag.USER)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const existingUser = await this.findByEmail(userData.email)
        console.log(existingUser)
        if (existingUser) {
            throw new ConflictException('Email já está em uso.');
        }

        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async update(id: string, userData: Partial<User>): Promise<User> {
        await this.userRepository.update(id, userData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.update(id, {
            isActive: false
        });
    }

    async reactivateUser(id: string): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        user.isActive = true;
        await this.userRepository.save(user);
        return user;
    }
}
