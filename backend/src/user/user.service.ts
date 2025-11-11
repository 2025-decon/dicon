import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/user/entities/user.entity';
import { AuthDTO } from 'src/auth/dto/authDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  async updateNickname(userId: number, nickname: string) {
    const user = await this.findById(userId);
    if (!user) {
      return null;
    }
    user.nickname = nickname;
    return await this.userRepository.save(user);
  }

  async updatePassword(userId: number, newPassword: string) {
    const user = await this.findById(userId);
    if (!user) {
      return null;
    }
    user.password = bcrypt.hashSync(newPassword, 10);
    return await this.userRepository.save(user);
  }
}