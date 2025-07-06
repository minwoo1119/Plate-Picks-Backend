export class CreatePreferenceDto {
  foodId: string;
  preference: 'Good' | 'Soso' | 'Bad';
}

export class SubmitPreferenceDto {
  participantId: string;
  preferences: CreatePreferenceDto[];
}
