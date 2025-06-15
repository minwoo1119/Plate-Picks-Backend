import { IsString } from 'class-validator';

export class CreateParticipantsDto {
  @IsString()
  name: string;
  @IsString()
  roomCode: string;
}
