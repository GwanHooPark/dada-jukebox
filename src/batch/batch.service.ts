import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JukeboxService } from '@/jukebox/jukebox.service';
import { BroadcastService } from '@/broadcast/broadcast.service';
import { MorningJung, BaeCam, Movie } from '@/enum/enums';

@Injectable()
export class BatchService {

    private readonly logger = new Logger(JukeboxService.name);
    constructor(
        private readonly jukeboxService: JukeboxService,
        private readonly broadcastService: BroadcastService
        ) {}

    //@Cron('10 10 13 * * *', { name: 'get Music' })
    @Cron('10 10 12 * * *', { name: 'get MorningJung' })
    broadCastMorningJung(): void {
        this.logger.log('broadCastMorningJung schedule....');
        this.jukeboxService.getMBCData(MorningJung).then(result => {            
            this.broadcastService.telegramSendMessage(result,'오늘 아침 정지영입니다');
        });
    }

    @Cron('15 10 12 * * *', { name: 'get BaeCam' })
    broadCastBaeCam(): void {
        this.logger.log('broadCastBaeCam schedule....');
        this.jukeboxService.getMBCData(BaeCam).then(result => {            
            this.broadcastService.telegramSendMessage(result,'배철수의 음악캠프');
        });
    }

    @Cron('20 10 12 * * *', { name: 'get Movie' })
    broadCastMovie(): void {
        this.logger.log('broadCastMovie schedule....');
        this.jukeboxService.getMBCMovieData(Movie).then(result => {            
            this.broadcastService.telegramSendMessage(result,'FM영화음악 김세윤입니다');
        });
    }
    
}