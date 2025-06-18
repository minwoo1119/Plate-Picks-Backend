import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Food } from 'src/food/food.entity';
import { Participants } from 'src/participants/participants.entity';

@Entity()
export class Preference {
  @PrimaryColumn('uuid')
  participantId: string;

  @PrimaryColumn('uuid')
  foodId: string;

  @ManyToOne(() => Participants, (participant) => participant.preferences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'participantId' })
  participant: Participants;

  @ManyToOne(() => Food, (food) => food.preferences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'foodId' })
  food: Food;

  @Column({ type: 'enum', enum: ['Good', 'Soso', 'Bad'], default: 'Soso' })
  rating: 'Good' | 'Soso' | 'Bad';

  @CreateDateColumn()
  responsed_at: Date;
}
