import { Injectable, Logger } from '@nestjs/common';
import { MusicInfo, MBCInfo } from '@/interface/interfaces';
import { MorningJung, BaeCam, Movie } from '@/enum/enums';
import { BroadcastService } from '@/broadcast/broadcast.service';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
type CheerioRoot = ReturnType<typeof load>;

@Injectable()
export class JukeboxService {

    private readonly logger = new Logger(JukeboxService.name);

    constructor(
        private readonly broadcastService: BroadcastService
        ) {}

    initMusicInfo(options?: Partial<MusicInfo>):MusicInfo {
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

    async getMBCData(info:MBCInfo): Promise<Array<MusicInfo>> {        
        
        const todayHtml:any = await this.getBorardSelectHtml(info);
        const $:CheerioRoot = cheerio.load(todayHtml.data);
        const list:any = $(info.ListSelector);
        
        let musicInfos:Array<MusicInfo> = [];
        list.each((idx:number, el:any) => {
            if(idx === 0) return true;
            musicInfos.push({
                title : $(el).find('p.title').text(),
                artist : $(el).find('p.singer').text()
            })            
        }); 
        return musicInfos;
    }

    async getMBCMovieData(info:MBCInfo): Promise<Array<MusicInfo>> {

        const todayHtml:any = await this.getBorardSelectHtml(info);
        const $:CheerioRoot = cheerio.load(todayHtml.data);
        const list:any = $(info.ListSelector);

        let musicInfos:Array<MusicInfo> = [];
        let tempMusicTitle:string;
        let tempMusicInfo:MusicInfo = this.initMusicInfo();

        list.each((idx:number, el:any) => {
            if(this.isMovieTitle($(el))) {
                tempMusicInfo.movieTitle = $(el).find('td.part').text();
                tempMusicTitle = $(el).find('td.part').text();
            }else{
                tempMusicInfo.title = $(el).find('p.title').text();
                tempMusicInfo.artist = $(el).find('p.singer').text();
                if(tempMusicInfo.movieTitle == ''){
                    tempMusicInfo.movieTitle = tempMusicTitle;
                }
                musicInfos.push(tempMusicInfo);
                tempMusicInfo = this.initMusicInfo();
            }         
        }); 

        return musicInfos;
    }

    isMovieTitle(el):boolean {
        return el.find('td.part').length > 0;
    }

    async getBorardSelectHtml(info:MBCInfo): Promise<any> {
        const todayLink:string = await this.getMBCTodayLink(info);
        const todayHtml:string = await this.getHtml(`${info.HomeUrl}${todayLink}`);
        return todayHtml;
    }

    

    async getMBCTodayLink(info:MBCInfo): Promise<string> {
        try {
            let firstPageHtml:any = await this.getHtml(info.DailyList);
            const $:CheerioRoot = cheerio.load(firstPageHtml.data);
            const todayLink = $(info.ListSelector).first().find('a').attr('href');
            return todayLink;
        }catch(err){
            console.log(err);
        }

    }

    async getHtml(url:string): Promise<string> {
        try {
            return axios.get(url);
        }catch(err) {
            this.logger.log(err);
        }
    }

    broadCastMorningJung(): void {
        this.logger.log('broadCast MorningJung....');
        this.getMBCData(MorningJung).then(result => {            
            this.broadcastService.telegramSendMessage(result,'오늘 아침 정지영입니다');
        });
    }

    broadCastBaeCam(): void {
        this.logger.log('broadCast BaeCam.....');
        this.getMBCData(BaeCam).then(result => {            
            this.broadcastService.telegramSendMessage(result,'배철수의 음악캠프');
        });
    }

    broadCastMovie(): void {
        this.logger.log('broadCast Movie....');
        this.getMBCMovieData(Movie).then(result => {            
            this.broadcastService.telegramSendMessage(result,'FM영화음악 김세윤입니다');
        });
    }
}