import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,  
  Unique,
  OneToMany 
} from 'typeorm';
import { Song } from '@/entity/song.entity';

@Entity({ name: 'station' })
@Unique(['id'])
export class Station extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, comment: '채널' })
  channel: string;

  @Column({ name: 'broadcast_name', length: 255, comment: '방송명' })
  braoadcastName: string;

  @Column({ name: 'home_url', length: 255, comment: '홈페이지url' })
  homeUrl: string;

  @Column({ name: 'daily_list', length: 255, comment: '매일게시판url' })
  dailyList: string;

  @Column({ name: 'list_selector', length: 255, comment: '셀렉터' })
  listSelector: string;

  @Column({ name: 'is_broadcast', comment: 'message 송신 여부' })
  isBroadCast: boolean;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @OneToMany(() => Song, song => song.station)
  songs: Song[];
}