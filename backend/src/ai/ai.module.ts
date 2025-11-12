import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiConfig } from './config/ai.config';
import { AiHttpClient } from './utils/ai-http.client';

@Module({
  imports: [HttpModule],
  controllers: [AiController],
  providers: [AiService, AiConfig, AiHttpClient],
  exports: [AiService],
})
export class AiModule {}

