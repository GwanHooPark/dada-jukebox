import { Injectable, Logger, BadGatewayException } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
const request = require("request");

@Injectable()
export class SpotifyAuth {

    private client_id: string;
    private client_secret: string;

    constructor(private readonly configService: ConfigService) {
        this.client_id = this.configService.get<string>('SPOTIFY_CLIENT_ID');
        this.client_secret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');
    }

    async getToken(): Promise<any> {
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            headers: {
                Authorization:
                    "Basic " + new Buffer(this.client_id + ":" + this.client_secret).toString("base64"),
            },
            form: {
                grant_type: "client_credentials",
            },
            json: true,
        };

        return new Promise((resolve, reject) => {
            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body.access_token);
                } else {
                    reject('spotify errorrrrr~');
                }
            });
        });
    }
}