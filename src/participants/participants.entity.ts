import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Room } from '../room/room.entity';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, (room) => room.participants, {
    onDelete: 'CASCADE',
  })
  room: Room;

  @Column()
  name: string;

  @CreateDateColumn()
  joined_at: Date;

  @Column({ default: false })
  completed: boolean;
}
