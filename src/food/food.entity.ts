import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Preference } from '../preference/preference.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ length: 30, default: 'korean' })
  category: string;

  @Column({ type: 'simple-array', nullable: true })
  mealTimes: string[];

  @Column({ default: 10000 })
  minBudget: number;

  @Column({ default: 18000 })
  maxBudget: number;

  @Column({ default: 2 })
  spiceLevel: number;

  @Column({ default: false })
  quickMeal: boolean;

  @Column({ default: false })
  shareable: boolean;

  @Column({ default: true })
  deliveryFriendly: boolean;

  @OneToMany(() => Preference, (preference) => preference.food)
  preferences: Preference[];
}
