import { IsBoolean, IsString } from 'class-validator';

export class GetParticipantsDto {
  @IsString()
  participantId: string;
  @IsString()
  name: string;
  @IsBoolean()
  completed: boolean;
}
