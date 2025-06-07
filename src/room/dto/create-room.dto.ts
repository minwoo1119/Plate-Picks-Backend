import { IsInt, Min } from 'class-validator';

export class CreateRoomDto {
  @IsInt()
  @Min(1)
  total_participants: number;
}
