import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageDTO } from './dto/mypage.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { AuthUser } from 'src/auth/decorators/get-user.decorator';

/**
 * 마이페이지 컨트롤러
 * 사용자의 계정 정보 조회 및 수정을 처리합니다.
 * JWT 인증이 적용되어 인증된 사용자만 접근 가능합니다.
 */
@Controller('mypage')
@UseGuards(JwtAuthGuard)
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  /**
   * 사용자 정보 조회
   * @param user - JWT 토큰에서 추출한 사용자 정보
   * @returns 사용자 기본 정보 (이메일, 닉네임, 가입일)
   */
  @Get()
  async getMyInfo(@GetUser() user: AuthUser) {
    return this.mypageService.getUserInfo(user.userId);
  }

  /**
   * 닉네임 변경
   * @param user - JWT 토큰에서 추출한 사용자 정보
   * @param updateNicknameDto - 새 닉네임
   * @returns 변경 성공 메시지 및 새 닉네임
   */
  @Patch('nickname')
  @HttpCode(HttpStatus.OK)
  async updateNickname(
    @GetUser() user: AuthUser,
    @Body() updateNicknameDto: MypageDTO.UpdateNicknameSecure,
  ) {
    const { nickname } = updateNicknameDto;
    return this.mypageService.changeNickname(user.userId, nickname);
  }

  /**
   * 비밀번호 변경
   * @param user - JWT 토큰에서 추출한 사용자 정보
   * @param updatePasswordDto - 현재 비밀번호, 새 비밀번호
   * @returns 변경 성공 메시지
   */
  @Patch('password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @GetUser() user: AuthUser,
    @Body() updatePasswordDto: MypageDTO.UpdatePasswordSecure,
  ) {
    const { currentPassword, newPassword } = updatePasswordDto;
    return this.mypageService.changePassword(
      user.userId,
      currentPassword,
      newPassword,
    );
  }
}
