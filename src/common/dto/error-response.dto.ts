import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 'Participant not found' })
  message: string;

  @ApiProperty({ example: 'NOT_FOUND' })
  code: string;
}
