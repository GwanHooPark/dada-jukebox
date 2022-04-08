import { Module } from '@nestjs/common';
import { BroadcastService } from '@/broadcast/broadcast.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [BroadcastService],
  exports: [BroadcastService]
})
export class BroadcastModule { }