import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '@domain/modules/user/entities/user.entity';
import { RepositoriesTag } from '@/common/constants';

@Injectable()
export class UserService {

    constructor(
        @Inject(RepositoriesTag.USER)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async update(id: string, userData: Partial<User>): Promise<User> {
        await this.userRepository.update(id, userData);
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
