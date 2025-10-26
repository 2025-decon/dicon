import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // 데이터베이스 호스트
      port: 5432, // 데이터베이스 포트
      username: 'dicon_user',
      password: 'your_secure_password', // 3단계에서 설정한 비밀번호로 꼭 변경하세요!
      database: 'dicon_db',
      entities: [User],
      synchronize: true, // 개발 환경에서만 true로 설정하세요.
    }),
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
