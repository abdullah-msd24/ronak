import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly eventId: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  readonly rating?: number;
}