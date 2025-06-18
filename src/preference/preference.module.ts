import { Food } from 'src/food/food.entity';
import { Module } from '@nestjs/common';
import { Participants } from 'src/participants/participants.entity';
import { Preference } from './preference.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Preference, Participants, Food])],
  controllers: [],
  providers: [],
})
export class PreferenceModule {}
