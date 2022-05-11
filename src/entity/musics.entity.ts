import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,  
  Unique,
  ManyToOne
} from 'typeorm';
import { Station } from '@/entity/station.entity';

@Entity({ name: 'musics' })
@Unique(['id'])
export class Musics extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, comment: '채널' })
  channel: string;

  @Column({ type: 'varchar', length: 255, comment: '방송명' })
  braoadcastName: string;

  @Column({ type: 'varchar', length: 255, comment: '홈페이지url' })
  homeUrl: string;

  @Column({ type: 'varchar', length: 255, comment: '매일게시판url' })
  dailyList: string;

  @Column({ type: 'varchar', length: 255, comment: '셀렉터' })
  listSelector: string;

  @Column({ type: 'boolean', default: true, comment: 'message 송신 여부' })
  isBroadCast: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @ManyToOne(() => Station, station => station.music)
  station: Station;
}