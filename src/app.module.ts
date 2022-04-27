import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BatchModule} from '@/batch/batch.module';
import { JukeboxModule } from './jukebox/jukebox.module';

import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      ignoreEnvFile: process.env.NODE_ENV !== 'dev', // prod일때는 heroku에 따로 설정
      validationSchema: Joi.object({
        TELEGRAM_BOT_TOKEN: Joi.string(),
        TELEGRAM_CHAT_ID: Joi.string(),
        TELEGRAM_BROADCAST: Joi.boolean()
      }),
    }),
    BatchModule,
    JukeboxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
