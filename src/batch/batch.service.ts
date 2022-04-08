import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JukeboxService } from '@/jukebox/jukebox.service';
import { BroadcastService } from '@/broadcast/broadcast.service';

@Injectable()
export class BatchService {

    private readonly logger = new Logger(JukeboxService.name);
    constructor(
        private readonly jukeboxService: JukeboxService,
        private readonly broadcastService: BroadcastService
        ) {}

    //@Cron('10 10 13 * * *', { name: 'get Music' })
    @Cron('10 * * * * *', { name: 'get Music' })
    getMusicList(): void {
        this.logger.log('get music....');
        this.jukeboxService.getMusicData().then(result => {            
            this.broadcastService.telegramSendMessage(result);
        });
    }  
    
}