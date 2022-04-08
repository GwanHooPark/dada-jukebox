import { Injectable, Logger } from '@nestjs/common';
import { MusicInfo, MBCInfo } from '@/interface/interfaces';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
type CheerioRoot = ReturnType<typeof load>;

@Injectable()
export class JukeboxService {

    private readonly logger = new Logger(JukeboxService.name);

    async getMBCData(info:MBCInfo): Promise<Array<MusicInfo>> {        
        const todayLink:string = await this.getMBCTodayLink(info);
        const todayHtml:any = await this.getHtml(`${info.HomeUrl}${todayLink}`);
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
}