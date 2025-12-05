import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  experienceDetails: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}