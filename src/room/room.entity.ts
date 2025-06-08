import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Participants } from 'src/participants/participants.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, type: 'varchar', length: 100 })
  code: string;

  @Column()
  total_participants: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Participants, (participant) => participant.room, {
    cascade: true,
  })
  participants: Participants[];
}
