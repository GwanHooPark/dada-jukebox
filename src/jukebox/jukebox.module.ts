import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JukeboxService } from '@/jukebox/jukebox.service';
import { BroadcastModule } from '@/broadcast/broadcast.module';
import { StationRepository } from '@/station/station.repository';

@Module({
  imports: [BroadcastModule, TypeOrmModule.forFeature([StationRepository])],
  controllers: [],
  providers: [JukeboxService],
  exports: [JukeboxService]
})
export class JukeboxModule { }