import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Food } from 'src/food/food.entity';
import { Participants } from 'src/participants/participants.entity';

@Entity()
export class Preference {
  @PrimaryColumn('uuid')
  participant_id: string;
  @PrimaryColumn('uuid')
  food_id: string;
  @ManyToOne(() => Participants, (participant) => participant.preferences, {
    onDelete: 'CASCADE',
  })
  participant: Participants;

  @ManyToOne(() => Food, (food) => food.preferences, {
    onDelete: 'CASCADE',
  })
  food: Food;

  @Column({ type: 'enum', enum: ['Good', 'Soso', 'Bad'], default: 'Soso' })
  rating: 'Good' | 'Soso' | 'Bad';

  @CreateDateColumn()
  responsed_at: Date;
}
