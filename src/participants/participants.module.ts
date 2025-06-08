import { Module } from '@nestjs/common';
import { Participants } from './participants.entity';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { Room } from 'src/room/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Participants, Room])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
