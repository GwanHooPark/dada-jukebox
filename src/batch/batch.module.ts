import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch.service';
import { JukeboxModule } from '@/jukebox/jukebox.module';
import { BroadcastModule } from '@/broadcast/broadcast.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JukeboxModule,
    BroadcastModule

  ],
  providers: [BatchService],
})
export class BatchModule { }