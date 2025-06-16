import { ConfigModule } from '@nestjs/config';
import { Food } from './food/food.entity';
import { FoodModule } from './food/food.module';
import { Module } from '@nestjs/common';
import { Participants } from './participants/participants.entity';
import { ParticipantsModule } from './participants/participants.module';
import { Preference } from './preference/preference.entity';
import { PreferenceModule } from './preference/preference.module';
import { Room } from './room/room.entity';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ 반드시 설정
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Room, Participants, Food, Preference],
      synchronize: true,
    }),
    RoomModule,
    ParticipantsModule,
    FoodModule,
    PreferenceModule,
  ],
})
export class AppModule {}
