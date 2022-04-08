import { Injectable, Logger } from '@nestjs/common';
import { MusicInfo } from '@/interface/interfaces';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
type CheerioRoot = ReturnType<typeof load>;

export enum MBC {
    homeUrl = 'https://miniweb.imbc.com',
    selectMusicPageUrl = 'https://miniweb.imbc.com/Music?page=1&progCode=FM4U000001070',
    listSelector = 'table.list-type tbody tr'
}

@Injectable()
export class JukeboxService {

    private readonly logger = new Logger(JukeboxService.name);

    async getMusicData(): Promise<Array<MusicInfo>> {        
        const todayUrl:string = await this.getUrl();
        const html:any = await this.getHtml(`${MBC.homeUrl}${todayUrl}`);
        const $:CheerioRoot = cheerio.load(html.data);
        const list:any = $(MBC.listSelector);
        
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