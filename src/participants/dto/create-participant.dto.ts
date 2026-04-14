import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateParticipantsDto {
  @ApiProperty({
    example: '민우',
    description: '참가자 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'room-id-or-invite-code',
    description: '방 ID 또는 초대 코드',
  })
  @IsString()
  roomId: string;
}
