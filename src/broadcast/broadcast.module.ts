import { Module } from '@nestjs/common';
import { BroadcastService } from '@/broadcast/broadcast.service';

@Module({
  imports: [],
  providers: [BroadcastService],
  exports: [BroadcastService]
})
export class BroadcastModule { }