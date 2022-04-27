import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from '@/batch/batch.service';
import { JukeboxModule } from '@/jukebox/jukebox.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JukeboxModule
  ],
  providers: [BatchService],
})
export class BatchModule { }