import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,  
  Unique,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Station } from '@/station/station.entity';

@Entity({ name: 'song' })
@Unique(['id'])
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'broadcast_date', comment: '날짜' })
  broadcastDate: Date;

  @Column({ length: 255, comment: '앨범썸네일' })
  thumbnail: string;

  @Column({ length: 255, comment: '가수' })
  artist: string;

  @Column({ length: 255, comment: '제목' })
  title: string;

  @Column({ name: 'movie_title', length: 255, comment: '영화제목' })
  movieTitle: string;

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @ManyToOne(() => Station, station => station.songs)
  @JoinColumn({ name: "station_id" })
  station: Station;
}