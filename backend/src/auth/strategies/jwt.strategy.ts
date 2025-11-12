import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

export interface JwtPayload {
  sub: number; // user id
  email: string;
  nickname: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret_key',
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: userId, email } = payload;

    // 사용자 존재 여부 확인
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // req.user에 저장될 정보
    return {
      userId: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }
}
