import { IsBoolean, IsString } from 'class-validator';

export class GetParticipantsDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  completed: boolean;
}
