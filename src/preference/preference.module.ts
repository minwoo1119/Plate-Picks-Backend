import { Food } from 'src/food/food.entity';
import { Module } from '@nestjs/common';
import { Participants } from 'src/participants/participants.entity';
import { Preference } from './preference.entity';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Preference, Participants, Food])],
  controllers: [PreferenceController],
  providers: [PreferenceService],
})
export class PreferenceModule {}
