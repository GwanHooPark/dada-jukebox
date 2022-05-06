import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JukeboxService } from '@/jukebox/jukebox.service';

@Injectable()
export class BatchService {

    private readonly logger = new Logger(JukeboxService.name);
    constructor(
        private readonly jukeboxService: JukeboxService
    ) { }

    //@Cron('10 * * * * *', { name: 'get MorningJung' })
    @Cron('10 10 12 * * *', { name: 'get MorningJung' })
    batchMorningJung(): void {
        this.logger.log('broadCastMorningJung schedule....');
        this.jukeboxService.broadCastMorningJung();
    }

    //@Cron('15 * * * * *', { name: 'get BaeCam' })
    @Cron('15 10 12 * * *', { name: 'get BaeCam' })
    batchBaeCam(): void {
        this.logger.log('broadCastBaeCam schedule.....');
        this.jukeboxService.broadCastBaeCam();
    }

    //@Cron('20 * * * * *', { name: 'get Movie' })
    @Cron('20 10 12 * * *', { name: 'get Movie' })
    broadCastMovie(): void {
        this.logger.log('broadCastMovie schedule....');
        this.jukeboxService.broadCastMovie();
    }

    @Cron('25 10 12 * * *', { name: 'get Movie' })
    broadHomeUrl(): void {
        this.logger.log('broadWebUrl schedule....');
        this.jukeboxService.broadCastWebUrl();
    }

    @Cron('30 10 12 * * *', { name: 'get Sticker' })
    broadCastSticker(): void {
        this.logger.log('broadCastSticker schedule....');
        this.jukeboxService.broadCastSticker();
    }

}