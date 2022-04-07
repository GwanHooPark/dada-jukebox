import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
type CheerioRoot = ReturnType<typeof load>;
type MusicInfo = {
    title : string,
    artist : string
}

export enum MBC {
    homeUrl = 'https://miniweb.imbc.com',
    selectMusicPageUrl = 'https://miniweb.imbc.com/Music?page=1&progCode=FM4U000001070',
    listSelector = 'table.list-type tbody tr'
}

@Injectable()
export class JukeboxService {

    private readonly logger = new Logger(JukeboxService.name);

    //@Cron('10 10 13 * * *', { name: 'get Music' })
    @Cron('10 * * * * *', { name: 'get Music' })
    musicListSchedule(): void {
        this.logger.log('get music....');
        this.getMusicData().then(result => {
            console.log(result);
        });
    }

    async getMusicData(): Promise<Array<MusicInfo>> {        
        const todayUrl:string = await this.getUrl();
        const html:any = await this.getHtml(`${MBC.homeUrl}${todayUrl}`);
        const $:CheerioRoot = cheerio.load(html.data);
        const list:any = $(MBC.listSelector);
        
        let musicInfos:Array<MusicInfo> = [];
        list.each((idx, el) => {
            musicInfos.push({
                title : $(el).find('p.title').text(),
                artist : $(el).find('p.singer').text()
            })            
        }); 
        return musicInfos;
    }

    async getUrl(): Promise<string> {
        try {
            let html:any = await this.getHtml(MBC.selectMusicPageUrl);
            const $:CheerioRoot = cheerio.load(html.data);
            const lettt = $(MBC.listSelector).first().find('a').attr('href');
            return lettt;
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
}