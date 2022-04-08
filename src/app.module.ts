import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BatchModule} from '@/batch/batch.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      ignoreEnvFile: process.env.NODE_ENV === 'dev', // prod일때는 heroku에 따로 설정
      validationSchema: Joi.object({
        TELEGRAM_BOT_TOKEN: Joi.string(),
        TELEGRAM_CHAT_ID: Joi.string().default('@dadajuke'),
        TELEGRAM_BROADCAST: Joi.boolean().default(false)
      }),
    }),
    BatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
