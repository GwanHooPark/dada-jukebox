import { Controller, Get, Render, Logger, Param } from '@nestjs/common';
import { JukeboxService } from './jukebox/jukebox.service';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly jukeboxService: JukeboxService
    ) {}

  @Get()
  @Render('index')
  root() {   
    return {message : `hello dada jukebox`};
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
}
