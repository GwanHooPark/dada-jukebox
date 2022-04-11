import { Injectable, Logger } from '@nestjs/common';
import { MusicInfo } from '@/interface/interfaces';
import { ConfigService } from '@nestjs/config';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class BroadcastService {

    private readonly logger = new Logger(BroadcastService.name);

    constructor(private configService: ConfigService) {}

    telegramSendMessage(message:any,order:string): void {
        
        const token:string = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        const chatId:string = this.configService.get<string>('TELEGRAM_CHAT_ID');
        const isBroadCast:boolean = this.configService.get('TELEGRAM_BROADCAST');
        const musicList:string = message
                .map(
                    (item: MusicInfo, index: number) =>
                        `${index+1}. ${item.title} - ${item.artist}`
                )
                .join("\r\n");        
        this.logger.log(`send message[${musicList}]`);
        const bot = new TelegramBot(token, {polling: false});
        if(isBroadCast){
            this.logger.log('send telegram channel message');
            const today = new Date().toLocaleDateString();
            if(order == 'first'){
                bot.sendMessage(chatId, `===== ${today} 시작 =====`)
            }
            
            bot.sendMessage(chatId, musicList).then(()=>{
                if(order == 'last') {
                    bot.sendMessage(chatId, `===== ${today} 끝 =====`)
                }
            });
        }
    }
}