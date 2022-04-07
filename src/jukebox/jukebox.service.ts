import { Injectable, Logger  } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
type CheerioRoot = ReturnType<typeof load>;
type MusicInfo = {
    title : string,
    artist : string
}

@Injectable()
export class JukeboxService {

    private readonly logger = new Logger(JukeboxService.name);

    @Cron('10 * * * * *', { name: 'get Music' })
    musicListSchedule(): void {
        this.logger.log('get music....');
        this.getMusicData().then(result => {
            console.log(result);
        });
    }

    async getMusicData(): Promise<Array<MusicInfo>> {

        const html:any = await this.getHtml();
        const $:CheerioRoot = cheerio.load(html.data);
        const list:any = $('table.list-type tbody tr');
        
        let musicInfos:Array<MusicInfo> = [];
        list.each((idx, el) => {
            musicInfos.push({
                title : $(el).find('p.title').text(),
                artist : $(el).find('p.singer').text()
            })            
        }); 
        return musicInfos;
    }
    
    async getHtml(): Promise<string> {
        try {
            return axios.get('https://miniweb.imbc.com/Music/View?seqID=5879&progCode=FM4U000001070&page=1');
        }catch(err) {
            this.logger.log(err);
        }
    }
}