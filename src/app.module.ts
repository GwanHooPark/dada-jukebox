import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BatchModule} from './batch.module';

@Module({
  imports: [BatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
