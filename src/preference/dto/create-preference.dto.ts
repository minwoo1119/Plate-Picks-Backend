import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePreferenceDto {
  @IsString()
  foodId: string;

  @IsIn(['Good', 'Soso', 'Bad'])
  preference: 'Good' | 'Soso' | 'Bad';
}

export class SubmitPreferenceDto {
  @IsString()
  participantId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreferenceDto)
  preferences: CreatePreferenceDto[];
}
