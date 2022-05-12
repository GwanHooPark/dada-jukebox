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
        ssl: {
          rejectUnauthorized: false,
        },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        autoLoadEntities: true,              
      }), 
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   // type: 'oracle',
    //   // host: 'adb.ap-chuncheon-1.oraclecloud.com',
    //   // port: 1522,
    //   // username: 'ADMIN',
    //   // sid: 'jukebox',
    //   // password: 'Rkawkakfn1!1',
    //   // //connectString : '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-chuncheon-1.oraclecloud.com))(connect_data=(service_name=g1d8d8476d67709_jukebox_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.ap-chuncheon-1.oraclecloud.com, OU=Oracle ADB CHUNCHEON, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))',
    //   // connectString : '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-chuncheon-1.oraclecloud.com))(connect_data=(service_name=g1d8d8476d67709_jukebox_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.ap-chuncheon-1.oraclecloud.com, OU=Oracle ADB CHUNCHEON, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))',
    //   // //connectString : 'adb.ap-chuncheon-1.oraclecloud.com:1522/jukebox',
    //   // entities: [],
    //   // //synchronize: true,
    //   // autoLoadEntities: true

    //   // type: 'postgres',
    //   // host: 'localhost',
    //   // port: 5432,
    //   // username: 'dada_admin',
    //   // password: 'rkawkakfn1!',
    //   // database: 'jukebox',
    //   // entities: [
    //   //   "dist/**/*.entity.ts"
    //   // ],
    //   // synchronize: true,
    //   // autoLoadEntities: true,

    //   type: 'postgres',
    //   // host:'ec2-52-4-104-184.compute-1.amazonaws.com',
    //   // port:5432,
    //   // username:'qjxoojyzrtpkyr',
    //   // password:'3f28f9f0b6b201cb9e668905f260add2f9f9875b8c720d3fd3adce6b8faa2727',
    //   // database:'d513aud3i65rr7',
    //   url: 'postgres://qjxoojyzrtpkyr:3f28f9f0b6b201cb9e668905f260add2f9f9875b8c720d3fd3adce6b8faa2727@ec2-52-4-104-184.compute-1.amazonaws.com:5432/d513aud3i65rr7',            
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true, // This for development
    //   autoLoadEntities: true,

    // }),
    BatchModule,
    JukeboxModule,
    SpotifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
