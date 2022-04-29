import { Module } from '@nestjs/common';
import { SpotifyService } from '@/spotify/spotify.service';
import { JukeboxModule } from '@/jukebox/jukebox.module';
import { SpotifyAuth } from './spotify.auth';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, JukeboxModule],
  controllers: [],
  providers: [SpotifyService, SpotifyAuth],
  exports: [SpotifyService]
})
export class SpotifyModule { }