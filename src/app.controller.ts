import { Controller, Get, Render, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    console.log('index page!!!');
    this.logger.log("testing page");
    return {message : `hello dada jukebox ${new Date()}`};
  }
}
