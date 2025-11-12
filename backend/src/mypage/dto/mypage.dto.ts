import { IsString, IsNumber, Length, MinLength } from 'class-validator';

export namespace MypageDTO {
  /**
   * 닉네임 변경 DTO
   */
  export class UpdateNickname {
    @IsNumber()
    userId: number;

    @IsString()
    @Length(2, 20, { message: '닉네임은 2자 이상 20자 이하로 입력해주세요.' })
    nickname: string;
  }

  /**
   * 비밀번호 변경 DTO
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
}
