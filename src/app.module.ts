import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Participants } from './participants/participants.entity';
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
      entities: [Room, Participants],
      synchronize: true,
    }),
    RoomModule,
  ],
})
export class AppModule {}
