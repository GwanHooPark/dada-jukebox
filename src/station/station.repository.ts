import { EntityRepository, Repository } from 'typeorm';
import { Station } from './station.entity';

@EntityRepository(Station)
export class StationRepository extends Repository<Station> {
    async findChannel(channel: string): Promise<Station> {
        return await this.findOne({
            where: [
                { channel: channel }
            ]
        })
    }
}