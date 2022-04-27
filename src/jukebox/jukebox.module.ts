import { Module } from '@nestjs/common';
import { JukeboxService } from '@/jukebox/jukebox.service';
import { BroadcastModule } from '@/broadcast/broadcast.module';

@Module({
  imports: [BroadcastModule],
  controllers: [],
  providers: [JukeboxService],
  exports: [JukeboxService]
})
export class JukeboxModule { }