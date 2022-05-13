import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from '@/batch/batch.module';
import { JukeboxModule } from './jukebox/jukebox.module';
import { SpotifyModule } from './spotify/spotify.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { oracledb } from "oracledb";

import * as Joi from 'joi';
//oracledb.initOracleClient({ libDir: "C:\\Users\\ghpark\\Downloads\\instantclient-basic-windows.x64-21.3.0.0.0" });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      ignoreEnvFile: process.env.NODE_ENV !== 'dev', // prod일때는 heroku에 따로 설정
      validationSchema: Joi.object({
        TELEGRAM_BOT_TOKEN: Joi.string(),
        TELEGRAM_CHAT_ID: Joi.string(),
        TELEGRAM_BROADCAST: Joi.boolean()
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url : config.get('DATABASE_URL'),
        // ssl: {
        //   rejectUnauthorized: false,
        // },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        autoLoadEntities: true,              
      }), 
      inject: [ConfigService],
    }),
    BatchModule,
    JukeboxModule,
    SpotifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
