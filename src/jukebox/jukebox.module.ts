import { Module } from '@nestjs/common';
import { JukeboxService } from './jukebox.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JukeboxService],
})
export class JukeboxModule { }