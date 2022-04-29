import { Injectable, Logger } from "@nestjs/common";
import { SpotifyAuth } from "./spotify.auth";
import { JukeboxService } from "@/jukebox/jukebox.service";
import { MusicInfo, MBCInfo, MusicList } from '@/interface/interfaces';
import { MorningJung, BaeCam, Movie } from '@/enum/enums';

var SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class SpotifyService {

    private readonly logger = new Logger(SpotifyService.name);

    constructor(
        private spotifyAuth: SpotifyAuth,
        private jukeboxService: JukeboxService){}

    async getAccessToken(): Promise<any> {                        
        return new Promise((resolve, reject) => {
            this.spotifyAuth.getToken()
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });});
    }

    async getMusicList(): Promise<Array<MusicList>> {
        const data: Array<MusicInfo> = await this.jukeboxService.getMBCData(MorningJung)
       
        return await Promise.all(
             data.map(info => { return this.searchSpotify(info)})           
         );
    }


    async searchSpotify(musicInfo: MusicInfo): Promise<MusicList> {

       // const accessToken = await this.getAccessToken();
        //console.log(accessToken)
        
        //Todo. async / await 로 처리
        return new Promise((resolve, reject) => {
            this.getAccessToken().then(accessToken => {
                var spotifyApi = new SpotifyWebApi();
                spotifyApi.setAccessToken(accessToken);
                spotifyApi.searchTracks(`track:${musicInfo.title} artist:${musicInfo.artist}`)
                .then(function(data) {
                    const result = data.body.tracks.items[0] ? data.body.tracks.items[0] : null;
                    let list: MusicList = {
                        albumThumbnailUrl : result ? result.album.images[2].url : '',
                        title : result ? result.name : musicInfo.title,
                        artist : result ? result.artists[0].name : musicInfo.artist,
                        previewUrl : result ? result.preview_url : ''
                    }
                    resolve(list);
                }, function(err) {
                    reject(err);
                });            
            });
        });
    }

}
