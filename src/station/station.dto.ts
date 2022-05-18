import { Station } from './station.entity';
export class StationDto {

    id?: string;
    channel: string;
    braoadcastName: string;
    homeUrl: string;
    dailyList: string;
    listSelector: string;
    isBroadCast: boolean;

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
        stationDto.dailyList = entity.dailyList;
        stationDto.listSelector = entity.listSelector;
        stationDto.isBroadCast = entity.isBroadCast;
        return stationDto;
    }
}