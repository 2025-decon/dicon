import { Module } from '@nestjs/common';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

/**
 * 마이페이지 모듈
 * 사용자의 계정 정보 조회 및 수정 기능을 제공합니다.
 */
@Module({
  imports: [UserModule, AuthModule],
  controllers: [MypageController],
  providers: [MypageService],
  exports: [MypageService],
})
export class MypageModule {}
