import {
  Controller,
  Get,
  Patch,
  Body,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageDTO } from './dto/mypage.dto';

/**
 * 마이페이지 컨트롤러
 * 사용자의 계정 정보 조회 및 수정을 처리합니다.
 * TODO: JWT 인증 가드 적용 후 userId를 토큰에서 추출하도록 개선 필요
 */
@Controller('mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  /**
   * 사용자 정보 조회
   * @param userId - 사용자 ID (임시로 query parameter로 전달)
   * @returns 사용자 기본 정보 (이메일, 닉네임, 가입일)
   */
  @Get()
  async getMyInfo(@Query('userId', ParseIntPipe) userId: number) {
    return this.mypageService.getUserInfo(userId);
  }

  /**
   * 닉네임 변경
   * @param updateNicknameDto - 사용자 ID와 새 닉네임
   * @returns 변경 성공 메시지 및 새 닉네임
   */
  @Patch('nickname')
  @HttpCode(HttpStatus.OK)
  async updateNickname(@Body() updateNicknameDto: MypageDTO.UpdateNickname) {
    const { userId, nickname } = updateNicknameDto;
    return this.mypageService.changeNickname(userId, nickname);
  }

  /**
   * 비밀번호 변경
   * @param updatePasswordDto - 사용자 ID, 현재 비밀번호, 새 비밀번호
   * @returns 변경 성공 메시지
   */
  @Patch('password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() updatePasswordDto: MypageDTO.UpdatePassword) {
    const { userId, currentPassword, newPassword } = updatePasswordDto;
    return this.mypageService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }
}
