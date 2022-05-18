import { Controller, Get, Render, Logger, Param, Query } from '@nestjs/common';
import { MusicList } from './interface/interfaces';
import { JukeboxService } from './jukebox/jukebox.service';
import { SpotifyService } from './spotify/spotify.service';
import { MorningJung, BaeCam, Movie } from '@/enum/enums';
import { StationDto } from './station/station.dto';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly jukeboxService: JukeboxService,
    private readonly spotifyService: SpotifyService
  ) { }

  @Get()
  @Render('musicList')
  async root() {
    const jungList: Array<MusicList> = await this.spotifyService.getMusicList('MorningJung');
    const baeList: Array<MusicList> = await this.spotifyService.getMusicList('BaeCam');
    const movieList: Array<MusicList> = await this.spotifyService.getMovieMusicList('Movie');
    return { jungList: jungList, baeList: baeList, movieList: movieList };
  }

  @Get('/admin7979')
  @Render('index')
  async musicList() {

    return { message: '123' };
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
      case 'web':
        this.jukeboxService.broadCastWebUrl();
      default:
        console.log('none');
    }
  }

  @Get('/api/search')
  search(@Query('keyword') keyword: string, @Query('artist') artist: string): void {
    this.spotifyService.search(keyword, artist);
    this.logger.log(`search keyword ${keyword}`);
  }

  @Get('/api/dbSearch')
  dbSearch(@Query('channel') channel: string): Promise<StationDto> {
    return this.jukeboxService.dBsearch(channel);
  }
}
