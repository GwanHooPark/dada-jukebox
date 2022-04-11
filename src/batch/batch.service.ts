import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JukeboxService } from '@/jukebox/jukebox.service';
import { BroadcastService } from '@/broadcast/broadcast.service';
import { MorningJung, BaeCam } from '@/enum/enums';

@Injectable()
export class BatchService {

    private readonly logger = new Logger(JukeboxService.name);
    constructor(
        private readonly jukeboxService: JukeboxService,
        private readonly broadcastService: BroadcastService
        ) {}

    //@Cron('10 10 13 * * *', { name: 'get Music' })
    @Cron('10 * * * * *', { name: 'get MorningJung' })
    broadCastMorningJung(): void {
        this.logger.log('broadCastMorningJung schedule....');
        this.jukeboxService.getMBCData(MorningJung).then(result => {            
            this.broadcastService.telegramSendMessage(result,'first');
        });
    }

    @Cron('15 * * * * *', { name: 'get BaeCam' })
    broadCastBaeCam(): void {
        this.logger.log('broadCastBaeCam schedule....');
        this.jukeboxService.getMBCData(BaeCam).then(result => {            
            this.broadcastService.telegramSendMessage(result,'last');
        });
    }
    
}