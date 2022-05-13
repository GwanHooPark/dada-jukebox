import { Injectable, Logger } from '@nestjs/common';
import { MusicInfo, MBCInfo } from '@/interface/interfaces';
import { ConfigService } from '@nestjs/config';
import { MorningJung, BaeCam, Movie } from '@/enum/enums';
import { BroadcastService } from '@/broadcast/broadcast.service';
import { StationRepository } from '@/station/station.repository';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
import { StationDto } from '@/station/station.dto';
import { Station } from '@/station/station.entity';
type CheerioRoot = ReturnType<typeof load>;

@Injectable()
export class JukeboxService {

    private readonly logger = new Logger(JukeboxService.name);

    constructor(
        private readonly broadcastService: BroadcastService,
        private readonly configService: ConfigService,
        private readonly stationRepository: StationRepository,
    ) { }

    initMusicInfo(options?: Partial<MusicInfo>): MusicInfo {
        const defaults = {
            movieTitle: '',
            title: '',
            artist: ''
        }
        return {
            ...defaults,
            ...options
        }
    }

    async getMBCData(info: MBCInfo): Promise<Array<MusicInfo>> {

        const todayHtml: any = await this.getBorardSelectHtml(info);
        const $: CheerioRoot = cheerio.load(todayHtml.data);
        const list: any = $(info.ListSelector);

        let musicInfos: Array<MusicInfo> = [];
        list.each((idx: number, el: any) => {
            if (idx === 0) return true;
            musicInfos.push({
                title: $(el).find('p.title').text(),
                artist: $(el).find('p.singer').text()
            })
        });

        return musicInfos;
    }

    async getMBCMovieData(info: MBCInfo): Promise<Array<MusicInfo>> {

        const todayHtml: any = await this.getBorardSelectHtml(info);
        const $: CheerioRoot = cheerio.load(todayHtml.data);
        const list: any = $(info.ListSelector);

        let musicInfos: Array<MusicInfo> = [];
        let tempMusicTitle: string;
        let tempMusicInfo: MusicInfo = this.initMusicInfo();

        list.each((idx: number, el: any) => {
            if (this.isMovieTitle($(el))) {
                tempMusicInfo.movieTitle = $(el).find('td.part').text();
                tempMusicTitle = $(el).find('td.part').text();
            } else {
                tempMusicInfo.title = $(el).find('p.title').text();
                tempMusicInfo.artist = $(el).find('p.singer').text();
                if (tempMusicInfo.movieTitle == '') {
                    tempMusicInfo.movieTitle = tempMusicTitle;
                }
                musicInfos.push(tempMusicInfo);
                tempMusicInfo = this.initMusicInfo();
            }
        });

        return musicInfos;
    }

    isMovieTitle(el): boolean {
        return el.find('td.part').length > 0;
    }

    async getBorardSelectHtml(info: MBCInfo): Promise<any> {
        const todayLink: string = await this.getMBCTodayLink(info);
        const todayHtml: string = await this.getHtml(`${info.HomeUrl}${todayLink}`);
        return todayHtml;
    }



    async getMBCTodayLink(info: MBCInfo): Promise<string> {
        try {
            let firstPageHtml: any = await this.getHtml(info.DailyList);
            const $: CheerioRoot = cheerio.load(firstPageHtml.data);
            const todayLink = $(info.ListSelector).first().find('a').attr('href');
            return todayLink;
        } catch (err) {
            console.log(err);
        }

    }

    async getHtml(url: string): Promise<string> {
        try {
            return axios.get(url);
        } catch (err) {
            this.logger.log(err);
        }
    }

    broadCastMorningJung(): void {
        this.logger.log('broadCast MorningJung....');
        this.getMBCData(MorningJung).then(result => {
            this.broadcastService.telegramSendMusicMessage(result, '오늘 아침 정지영입니다');
        });
    }

    broadCastBaeCam(): void {
        this.logger.log('broadCast BaeCam.....');
        this.getMBCData(BaeCam).then(result => {
            this.broadcastService.telegramSendMusicMessage(result, '배철수의 음악캠프');
        });
    }

    broadCastMovie(): void {
        this.logger.log('broadCast Movie....');
        this.getMBCMovieData(Movie).then(result => {
            this.broadcastService.telegramSendMusicMessage(result, 'FM영화음악 김세윤입니다');
        });
    }

    broadCastWebUrl(): void {
        this.logger.log('broadCast WebUrl....');
        const url: string = this.configService.get<string>('JUKEBOX_WEB');
        this.broadcastService.telegramSendMessage(url, '홈페이지');
    }

    broadCastSticker(): void {
        this.logger.log('broadCast Sticker....');

        const stickerArray: Array<string> = [
            'CAACAgIAAxkBAAETa0xiaPlCDvoQnW7_CqTT8wLISiBFGwACvRYAAjAMGUlko0VdYj3dvCQE',
            'CAACAgIAAxkBAAETa1BiaPlP6DjUiUiZhVxXOAgSDmqPyQACDBUAArWWwEkbvTw_gXdZNCQE',
            'CAACAgIAAxkBAAETa1JiaPlfmPRnajXieTFWNvY9EEvv2AACXxAAArzjcEqZGcffSNgbqyQE',
            'CAACAgIAAxkBAAETa1RiaPlzhCan5sp1giV7jIxw09p05gACGxoAAlmacEpfd39IdgQAATMkBA',
            'CAACAgIAAxkBAAETa1ZiaPl6m_GUttOpTDDg2gP96_3HlQACXxMAAnRAyEngtYG71Vj44SQE',
            'CAACAgIAAxkBAAETa1hiaPl9i1ABy2G-UxWCVvHBrJ21xgACERcAAibbGEltzfGE5-uWTSQE',
            'CAACAgIAAxkBAAETa1piaPmD1N7FqbYKeLkaVEOiH2WOowAC_RIAAi0PwEqm7dD72wHRCyQE',
            'CAACAgIAAxkBAAETa1xiaPmHHcRqE-iVR9jaHHXjrQG_HgACrxIAAvBlyUmhaw1_yW2QySQE',
            'CAACAgIAAxkBAAETa15iaPmMAAGUiysZtJhrAlef1PL2PPkAAkUVAAJuzcBKpd2uppSx2egkBA',
            'CAACAgIAAxkBAAETa2BiaPmP7yiRacp2QSxUNZfMa3rblwACOBgAArryGUmbrkkDX0225yQE',
            'CAACAgIAAxkBAAETa2JiaPmRf4fL9fJIA3A-FF1B6oIHkgAC2BcAAlMgcUqaxWeEUY2fkyQE',
            'CAACAgIAAxkBAAETa2RiaPmZtPrRkLYgevNDT4NhCRa45QACkxUAAha3eErV5NpvJN9I8CQE',
            'CAACAgIAAxkBAAETa2ZiaPmdHeX6061qa9qLfEDDDv0s0gACERcAAibbGEltzfGE5-uWTSQE'
        ];
        const randomNum: number = Math.floor(Math.random() * stickerArray.length);
        this.broadcastService.telegramSendSticker(stickerArray[randomNum]);
    }

    async dBsearch(channel: string) : Promise<StationDto> {
        const t:Station = await this.stationRepository.findChannel(channel);
        console.log(t)
        return StationDto.toStationDto(t)
    }
}