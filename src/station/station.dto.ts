import { Station } from './station.entity';
export class StationDto {

    private id?: string;
    private channel: string;
    private braoadcastName: string;
    private homeUrl: string;
    private dailyList: string;
    private listSelector: string;
    private isBroadCast: boolean;

    toStationEntity(): Station {
        return Station.from(
            this.channel,
            this.braoadcastName,
            this.homeUrl,
            this.dailyList,
            this.listSelector,
            this.isBroadCast
        )
    }

    static toStationDto(entity: Station): StationDto {        
        const stationDto = new StationDto();
        stationDto.id = entity.id;
        stationDto.channel = entity.channel;
        stationDto.braoadcastName = entity.braoadcastName;
        stationDto.homeUrl = entity.homeUrl;
        stationDto.listSelector = entity.listSelector;
        stationDto.isBroadCast = entity.isBroadCast;
        return stationDto;
    }
}