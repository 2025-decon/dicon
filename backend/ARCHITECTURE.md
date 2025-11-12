# Backend 아키텍처 가이드

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [아키텍처 패턴](#아키텍처-패턴)
4. [AI 서버 연동](#ai-서버-연동)
5. [데이터베이스 설계](#데이터베이스-설계)
6. [인증 시스템](#인증-시스템)
7. [주요 백엔드 기법](#주요-백엔드-기법)

---

## 프로젝트 개요

본 프로젝트는 **NestJS** 기반의 웹 서버와 **FastAPI** 기반의 AI 서버를 연동하여 AI 추천 및 프롬프트 생성 서비스를 제공하는 풀스택 애플리케이션입니다.

### 시스템 구성도

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│   Frontend      │────────▶│   NestJS Web    │────────▶│   FastAPI AI    │
│   (Next.js)     │◀────────│   Server        │◀────────│   Server        │
│                 │         │   (Port 3001)   │         │   (Port 8000)   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     │
                                     │
                                     ▼
                            ┌─────────────────┐
                            │                 │
                            │   MySQL DB      │
                            │                 │
                            └─────────────────┘
```

---

## 기술 스택

### Web Server (NestJS)
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **HTTP Client**: Axios
- **Validation**: class-validator, class-transformer

### AI Server (FastAPI)
- **Framework**: FastAPI
- **Language**: Python 3.x
- **AI/ML**: OpenAI API, LangChain
- **Response**: JSON

---

## 아키텍처 패턴

### 1. 모듈 기반 아키텍처 (Module-based Architecture)

NestJS는 모듈 패턴을 기반으로 애플리케이션을 구성합니다.

```typescript
@Module({
  imports: [
    ConfigModule.forRoot(),           // 환경변수 관리
    TypeOrmModule.forRoot({...}),     // DB 연결
    AuthModule,                        // 인증 모듈
    UserModule,                        // 사용자 모듈
    AiModule,                          // AI 연동 모듈
    MypageModule,                      // 마이페이지 모듈
  ],
})
export class AppModule {}
```

**주요 특징:**
- **느슨한 결합 (Loose Coupling)**: 각 모듈은 독립적으로 동작
- **높은 응집도 (High Cohesion)**: 관련된 기능을 하나의 모듈로 그룹화
- **재사용성**: 모듈을 다른 프로젝트에서도 사용 가능

### 2. 의존성 주입 (Dependency Injection)

NestJS의 핵심 패턴으로, 클래스 간의 의존성을 관리합니다.

```typescript
@Injectable()
export class AiService {
  constructor(
    private readonly config: AiConfig,           // Config 주입
    private readonly httpClient: AiHttpClient,   // HTTP Client 주입
  ) {}
}
```

**장점:**
- 테스트 용이성 (Mock 객체 주입 가능)
- 코드 재사용성 향상
- 결합도 감소

### 3. 레이어드 아키텍처 (Layered Architecture)

```
┌─────────────────────────────────────┐
│  Controller Layer                   │  ← HTTP 요청/응답 처리
│  (ai.controller.ts)                 │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Service Layer                      │  ← 비즈니스 로직
│  (ai.service.ts)                    │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Data Access Layer                  │  ← 외부 시스템 통신
│  (ai-http.client.ts)                │
└─────────────────────────────────────┘
```

---

## AI 서버 연동

### 1. 아키텍처 설계

#### 통신 흐름
```
Client ──(1)──> NestJS Controller
                     │
                (2)  │ DTO Validation
                     │
                     ▼
                NestJS Service
                     │
                (3)  │ Request Transform
                     │
                     ▼
                HTTP Client
                     │
                (4)  │ HTTP POST
                     │
                     ▼
              FastAPI Server
                     │
                (5)  │ AI Processing
                     │
                     ▼
                Response JSON
                     │
                (6)  │ Response Transform
                     │
                     ▼
Client ◀───(7)─── NestJS Controller
```

### 2. 구현 상세

#### Config 패턴
```typescript
// backend/src/ai/config/ai.config.ts
@Injectable()
export class AiConfig {
  readonly serverUrl: string;

  constructor() {
    // 환경변수에서 AI 서버 URL 로드 (기본값: localhost:8000)
    this.serverUrl = process.env.AI_SERVER_URL || 'http://localhost:8000';
  }

  getRecommendEndpoint(): string {
    return `${this.serverUrl}/ai/recommend`;
  }

  getPromptEndpoint(): string {
    return `${this.serverUrl}/ai/prompt`;
  }
}
```

**설계 의도:**
- 환경별로 다른 AI 서버 URL 사용 가능 (dev, staging, prod)
- 엔드포인트를 중앙에서 관리하여 변경 용이

#### HTTP Client 추상화
```typescript
// backend/src/ai/utils/ai-http.client.ts
@Injectable()
export class AiHttpClient {
  async post<T>(url: string, data: any): Promise<T> {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,  // 10초 타임아웃
    });
    return response.data;
  }
}
```

**주요 기법:**
- **Generic Type**: 타입 안정성 확보
- **Timeout 설정**: AI 서버 응답 지연 시 빠른 실패
- **Header 표준화**: 일관된 요청 형식

#### Service Layer
```typescript
// backend/src/ai/ai.service.ts
@Injectable()
export class AiService {
  async getRecommendation(dto: RecommendRequestDto): Promise<RecommendResponseDto> {
    try {
      // DTO의 필드명을 AI 서버 스펙에 맞게 변환
      return await this.httpClient.post<RecommendResponseDto>(
        this.config.getRecommendEndpoint(),
        { user_input: dto.userInput },  // camelCase → snake_case
      );
    } catch (error) {
      AiErrorHandler.handleError(error, 'AI 추천 중 오류가 발생했습니다.');
    }
  }
}
```

**핵심 포인트:**
1. **데이터 변환**: 프론트엔드(camelCase) ↔ AI 서버(snake_case)
2. **에러 처리**: 통일된 에러 핸들링
3. **타입 안정성**: TypeScript로 컴파일 타임 검증

### 3. 에러 처리 전략

```typescript
// backend/src/ai/utils/ai-error.handler.ts
export class AiErrorHandler {
  static handleError(error: any, message: string): never {
    if (error.response?.status === 400) {
      // AI 서버의 유효성 검증 실패
      throw new BadRequestException(
        error.response.data.detail || '잘못된 요청입니다.'
      );
    }

    if (error.code === 'ECONNREFUSED') {
      // AI 서버 연결 불가
      throw new InternalServerErrorException(
        'AI 서버에 연결할 수 없습니다. 관리자에게 문의하세요.'
      );
    }

    // 기타 오류
    throw new InternalServerErrorException(message);
  }
}
```

**에러 타입별 처리:**
- **400 Bad Request**: 금지어 포함 등 입력 오류
- **ECONNREFUSED**: AI 서버 다운
- **Timeout**: 응답 지연
- **500 Internal Error**: 예상치 못한 오류

### 4. DTO (Data Transfer Object) 패턴

#### Request DTO
```typescript
// backend/src/ai/dto/recommend-request.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class RecommendRequestDto {
  @IsString()
  @IsNotEmpty()
  userInput: string;  // 자동 유효성 검증
}
```

#### Response DTO
```typescript
// backend/src/ai/dto/recommend-response.dto.ts
export class RecommendResponseDto {
  recommendation: string;
  links: Record<string, string>;
}
```

**DTO의 역할:**
1. **유효성 검증**: `class-validator`로 자동 검증
2. **문서화**: Swagger 자동 생성
3. **타입 안정성**: 컴파일 타임 체크

---

## 데이터베이스 설계

### 1. TypeORM 설정

```typescript
// app.module.ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.entity.{ts,js}`],
  synchronize: Boolean(process.env.DB_SYNC),  // 개발환경에서만 true
})
```

**주요 기법:**
- **Entity Auto-loading**: 모든 `*.entity.ts` 파일 자동 로드
- **Environment-based Config**: 환경별 DB 설정
- **Synchronize 제어**: 프로덕션에서는 마이그레이션 사용

### 2. Entity 설계 예시

```typescript
// backend/src/user/entities/user.entity.ts
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;  // 해시된 비밀번호

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### 3. Repository 패턴

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
```

---

## 인증 시스템

### JWT 기반 인증

```typescript
// auth/auth.service.ts
@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // JWT 페이로드
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

**보안 고려사항:**
- 비밀번호는 bcrypt로 해싱
- JWT 토큰에 민감 정보 미포함
- 토큰 만료 시간 설정 (예: 1시간)

---

## 주요 백엔드 기법

### 1. 조건부 모듈 로딩

```typescript
@Module({
  imports: [
    ConfigModule.forRoot(),
    ...(process.env.DB_HOST
      ? [TypeOrmModule.forRoot({...}), AuthModule, UserModule]
      : []),
    AiModule,  // DB 없이도 AI 기능 사용 가능
  ],
})
```

**목적:** AI 기능만 사용하는 환경에서 DB 없이도 실행 가능

### 2. 에러 필터 (Global Exception Filter)

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // 로깅
    console.error(exception);

    // 표준화된 에러 응답
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
```

### 3. Interceptor (로깅, 변환)

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
    );
  }
}
```

### 4. Guard (인증/권한 체크)

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // JWT 토큰 검증
    return super.canActivate(context);
  }
}
```

---

## 환경 변수 관리

### .env 파일 구조

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=dicon
DB_SYNC=true

# AI Server
AI_SERVER_URL=http://localhost:8000

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h

# Server
PORT=3001
```

### ConfigModule 활용

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,          // 전역 사용
      envFilePath: '.env',     // 파일 경로
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        AI_SERVER_URL: Joi.string().required(),
      }),
    }),
  ],
})
```

---

## 테스트 전략

### Unit Test
```typescript
describe('AiService', () => {
  it('should return recommendation', async () => {
    const mockResponse = { recommendation: 'GPT', links: {} };
    jest.spyOn(httpClient, 'post').mockResolvedValue(mockResponse);

    const result = await service.getRecommendation({ userInput: 'test' });
    expect(result).toEqual(mockResponse);
  });
});
```

### Integration Test
```typescript
describe('AI Module (e2e)', () => {
  it('/ai/recommend (POST)', () => {
    return request(app.getHttpServer())
      .post('/ai/recommend')
      .send({ userInput: 'test' })
      .expect(200);
  });
});
```

---

## 배포 및 운영

### 프로덕션 체크리스트

- [ ] `DB_SYNC=false` 설정 (마이그레이션 사용)
- [ ] 환경변수 암호화
- [ ] CORS 설정
- [ ] Rate Limiting 적용
- [ ] 로깅 시스템 구축
- [ ] 헬스체크 엔드포인트 (`/health`)
- [ ] AI 서버 헬스체크
- [ ] 에러 모니터링 (Sentry 등)

---

## 참고 자료

- [NestJS 공식 문서](https://docs.nestjs.com)
- [TypeORM 공식 문서](https://typeorm.io)
- [AI 서버 연동 가이드](./README_AI.md)
