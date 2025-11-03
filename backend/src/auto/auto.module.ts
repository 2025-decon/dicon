import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoService } from './auto.service'; 
import { AutoEntity } from './entities/auto.entity'; 
import { AutoController } from './auto.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AutoEntity]), 
  ],
  controllers: [AutoController],
  providers: [AutoService],
  exports: [AutoService],
})
export class AutoModule {}