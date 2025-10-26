import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

        async findOneByName(name: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { name } });
    }

    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }
}
