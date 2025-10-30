import { Module } from '@nestjs/common';
import { AutoService } from './auto.service';
import { AutoController } from './auto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoEntity } from './entities/auto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AutoEntity]),
  ],
  controllers: [AutoController],
  providers: [AutoService],
  exports: [AutoService, TypeOrmModule],
})
export class AutoModule {}