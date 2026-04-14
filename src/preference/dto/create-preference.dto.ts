import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePreferenceDto {
  @ApiProperty({
    example: 'food-id-1',
    description: '음식 식별자',
  })
  @IsString()
  foodId: string;

  @ApiProperty({
    example: 'Good',
    enum: ['Good', 'Soso', 'Bad'],
  })
  @IsIn(['Good', 'Soso', 'Bad'])
  preference: 'Good' | 'Soso' | 'Bad';
}

export class SubmitPreferenceDto {
  @ApiProperty({
    example: 'participant-id',
    description: '선호도를 제출하는 참가자 ID',
  })
  @IsString()
  participantId: string;

  @ApiProperty({
    type: [CreatePreferenceDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreferenceDto)
  preferences: CreatePreferenceDto[];
}
