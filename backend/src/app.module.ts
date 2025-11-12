import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';
import { UserEntity } from './user/entities/user.entity';
import { MypageModule } from './mypage/mypage.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...(process.env.DB_HOST
      ? [
          TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [`${__dirname}/**/entities/*.entity.{ts,js}`],
            synchronize: Boolean(process.env.DB_SYNC),
          }),
          AuthModule,
          UserModule,
          MypageModule,
        ]
      : []),
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
