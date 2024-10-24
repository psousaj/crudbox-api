import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { DatabaseTags } from '@/helpers/constants';

@Injectable()
export class UserService {
    private userRepository: Repository<User>;

    constructor(
        @Inject(DatabaseTags.SQL) private readonly dataSource: DataSource,
    ) {
        this.userRepository = this.dataSource.getRepository(User);
    }

}
