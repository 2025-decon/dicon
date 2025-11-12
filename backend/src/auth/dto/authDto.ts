import { IsEmail, IsString, Length, Matches } from "class-validator";

export namespace AuthDTO {
    /**
     * 회원가입 DTO
     */
    export class SignUp {
      @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
      email: string;

      @IsString()
      @Length(8, 20, { message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
      @Matches(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
      })
      password: string;

      @IsString()
      @Length(2, 20, { message: '닉네임은 2자 이상 20자 이하로 입력해주세요.' })
      @Matches(/^[a-zA-Z0-9가-힣_-]+$/, {
        message: '닉네임은 한글, 영문, 숫자, 언더스코어, 하이픈만 사용 가능합니다.'
      })
      nickname: string;
    }

    /**
     * 로그인 DTO
     */
    export class SignIn {
      @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
      email: string;

      @IsString()
      @Length(4, 20, { message: '비밀번호를 입력해주세요.' })
      password: string;
    }
  }