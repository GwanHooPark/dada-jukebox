import { Controller, Get, Render, Logger, Param, Query } from '@nestjs/common';
import { MusicList } from './interface/interfaces';
import { JukeboxService } from './jukebox/jukebox.service';
import { SpotifyService } from './spotify/spotify.service';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly jukeboxService: JukeboxService,
    private readonly spotifyService: SpotifyService
    ) {}

  @Get()
  @Render('index')
  async root() {   
    const list:Array<MusicList> = await this.spotifyService.getMusicList();
    console.log(list)
    return { message: '123 ', musicList : list}
  }

  @Get('/api/broadcast/:type')
  broadcast(@Param('type') type: string): void {
    this.logger.log(`braoadcast excute [${type}]`);
    switch (type) {
      case 'jung':
        this.jukeboxService.broadCastMorningJung();
        break;
      case 'bae':
        this.jukeboxService.broadCastBaeCam();
        break;
      case 'movie':
        this.jukeboxService.broadCastMovie();
        break;
      case 'sticker':
        this.jukeboxService.broadCastSticker();
        break;
      default:
        console.log('none');
    }
  }
  
  @Get('/api/search')
  search(@Query('keyword') keyword: string): void {
    this.logger.log(`search keyword ${keyword}`);    
  }
}
