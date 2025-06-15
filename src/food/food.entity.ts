import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Preference } from 'src/preference/preference.entity';

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

  @OneToMany(() => Preference, (preference) => preference.food)
  preferences: Preference[];
}
