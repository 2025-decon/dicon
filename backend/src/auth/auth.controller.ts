import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UnauthorizedException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthDTO } from './dto/authDto';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    // JWT 페이로드 생성
    const payload = {
      sub: user.id,
      email: user.email,
      nickname: user.nickname,
    };

    // JWT 토큰 발급
    const accessToken = this.jwtService.sign(payload);

    return {
      message: '로그인 성공',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }
}