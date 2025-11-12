import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MypageService {
  constructor(private readonly userService: UserService) {}

  /**
   * 사용자 정보 조회
   */
  async getUserInfo(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      created_at: user.created_at,
    };
  }

  /**
   * 닉네임 변경
   */
  async changeNickname(userId: number, nickname: string) {
    // 사용자 확인
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 닉네임 중복 확인
    const existingUser = await this.userService.findByNickname(nickname);
    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('이미 사용중인 닉네임입니다.');
    }

    // 닉네임 변경
    const updatedUser = await this.userService.updateNickname(userId, nickname);
    if (!updatedUser) {
      throw new NotFoundException('닉네임 변경에 실패했습니다.');
    }

    return {
      message: '닉네임이 변경되었습니다.',
      nickname: updatedUser.nickname,
    };
  }

  /**
   * 비밀번호 변경
   */
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    // 사용자 확인
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 현재 비밀번호 확인
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }

    // 새 비밀번호로 변경
    await this.userService.updatePassword(userId, newPassword);

    return {
      message: '비밀번호가 변경되었습니다.',
    };
  }
}
