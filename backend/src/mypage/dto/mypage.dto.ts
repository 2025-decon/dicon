import { IsString, IsNumber, Length, MinLength, IsEmail, Matches } from 'class-validator';

export namespace MypageDTO {
  /**
   * 닉네임 변경 DTO (기존 - 하위 호환성 유지)
   * @deprecated JWT 인증 적용 후 UpdateNicknameSecure 사용 권장
   */
  export class UpdateNickname {
    @IsNumber()
    userId: number;

    @IsString()
    @Length(2, 20, { message: '닉네임은 2자 이상 20자 이하로 입력해주세요.' })
    nickname: string;
  }

  /**
   * 닉네임 변경 DTO (보안 강화 버전)
   * JWT 토큰에서 userId를 가져오므로 userId 필드 불필요
   */
  export class UpdateNicknameSecure {
    @IsString()
    @Length(2, 20, { message: '닉네임은 2자 이상 20자 이하로 입력해주세요.' })
    @Matches(/^[a-zA-Z0-9가-힣_-]+$/, {
      message: '닉네임은 한글, 영문, 숫자, 언더스코어, 하이픈만 사용 가능합니다.'
    })
    nickname: string;
  }

  /**
   * 비밀번호 변경 DTO (기존 - 하위 호환성 유지)
   * @deprecated JWT 인증 적용 후 UpdatePasswordSecure 사용 권장
   */
  export class UpdatePassword {
    @IsNumber()
    userId: number;

    @IsString()
    @MinLength(4, { message: '현재 비밀번호를 입력해주세요.' })
    currentPassword: string;

    @IsString()
    @Length(4, 20, { message: '새 비밀번호는 4자 이상 20자 이하로 입력해주세요.' })
    newPassword: string;
  }

  /**
   * 비밀번호 변경 DTO (보안 강화 버전)
   * JWT 토큰에서 userId를 가져오므로 userId 필드 불필요
   */
  export class UpdatePasswordSecure {
    @IsString()
    @MinLength(4, { message: '현재 비밀번호를 입력해주세요.' })
    currentPassword: string;

    @IsString()
    @Length(8, 20, { message: '새 비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)/, {
      message: '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
    })
    newPassword: string;
  }
}
