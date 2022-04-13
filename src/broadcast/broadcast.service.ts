import { Injectable, Logger } from '@nestjs/common';
import { MusicInfo } from '@/interface/interfaces';
import { ConfigService } from '@nestjs/config';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class BroadcastService {

    private readonly logger = new Logger(BroadcastService.name);

    constructor(private configService: ConfigService) {}

    makeTelegramMessage(item:MusicInfo,index:number) : string {
        const musicTitle = item.movieTitle ? `[${item.movieTitle}]` : '';
        return  `${index+1}. ${musicTitle} ${item.title} - ${item.artist}`;

    }
    
    telegramSendMessage(message:any,title:string): void {
        
        const token:string = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        const chatId:string = this.configService.get<string>('TELEGRAM_CHAT_ID');
        const isBroadCast:boolean = this.configService.get('TELEGRAM_BROADCAST');
        const today = new Date().toLocaleDateString();
        const musicList:string = message
                                .map(this.makeTelegramMessage)
                                .join("\r\n");        
        const messageTitle:string = `==== ${today} ${title} ====\r\n`;
        
        this.logger.log(`send message[${musicList}]`);

        const bot = new TelegramBot(token, {polling: false});
        if(isBroadCast){
            this.logger.log('send telegram channel message');
            bot.sendMessage(chatId, messageTitle + musicList);
        }
    }
}