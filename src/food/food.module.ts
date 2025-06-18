import { Food } from './food.entity';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Module } from '@nestjs/common';
import { Preference } from 'src/preference/preference.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Preference])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
